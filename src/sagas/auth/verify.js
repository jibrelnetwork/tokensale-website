import moment from 'moment'
import { delay } from 'redux-saga'
import LogRocket from 'logrocket'
import { replace } from 'react-router-redux'
import { put, call, take, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import * as actions from '../../actions'
import * as ACCOUNT from '../../constants/account'
import * as VERIFY from '../../constants/auth/verify'
import { SERVER } from '../.'
import { gtm, storage } from '../../services'
import request from '../request'

const getForm = (state) => `account-${state.auth.token}`

const GET_ACCOUNT_DELAY = 30000

function pushRegistrationSuccessEvent(isVerified) {
  const isRegistrationSuccessEventSended = (storage.getRegistrationSuccessEventSended() === '1')

  if (isRegistrationSuccessEventSended || !isVerified) {
    return
  }

  gtm.pushRegistrationSuccess()
  storage.setRegistrationSuccessEventSended('1')
}

function getAccountData(responseData) {
  return {
    firstName: responseData.first_name,
    lastName: responseData.last_name,
    email: responseData.username,
  }
}

function* onAccountResponse({ success, data }) {
  if (success) {
    const verifyStatus = data.identity_verification_status
    yield pushRegistrationSuccessEvent(verifyStatus === 'Approved')
    yield put(actions.auth.verify.setStatus(verifyStatus))
    yield put({ type: ACCOUNT.DASHBOARD.SET_DATA, payload: { accountData: getAccountData(data) } })
  } else {
    yield put(actions.auth.verify.setStatus(null))
    console.log('Verification request error')
  }
}

export function* getStatus(periodically = false, silent = false) {
  function* makeRequest() {
    const response = yield call(request, `${SERVER}/api/account/`, null, 'get', { silent })
    yield onAccountResponse(response)
  }
  if (periodically) {
    while (true) { // eslint-disable-line fp/no-loops
      yield call(makeRequest)
      yield delay(GET_ACCOUNT_DELAY)
    }
  } else {
    yield call(makeRequest)
  }
}

export function* confirmTerms() {
  while (true) { // eslint-disable-line fp/no-loops
    yield take(VERIFY.CONFIRM_TERMS)
    const form = yield select(getForm)
    const data = { terms_confirmed: true }
    yield put(startSubmit(form))
    const response = yield call(request, `${SERVER}/api/account/`, data, 'put')
    if (response.success) {
      yield put(stopSubmit(form))
      gtm.pushVerificationNextStep('ConfirmAgreement')
      yield put(actions.auth.verify.setStage('user-info'))
    } else {
      yield put(stopSubmit(form))
    }
  }
}

export function* updateUserInfo() {
  while (true) { // eslint-disable-line fp/no-loops
    const {
      payload: { firstName, lastName, birthday, residency, citizenship },
    } = yield take(VERIFY.UPDATE_USER_INFO)
    const form = yield select(getForm)
    const data = {
      residency,
      citizenship,
      last_name: lastName,
      first_name: firstName,
      date_of_birth: moment(birthday).format('YYYY-MM-DD'),
    }
    yield put(startSubmit(form))
    const response = yield call(request, `${SERVER}/api/account/`, data, 'put')
    if (response.success) {
      yield put(stopSubmit(form))
      gtm.pushVerificationNextStep('BasicInfo')
      yield put(actions.auth.verify.setStage('document'))
    } else if (response.error) {
      const errors = {
        lastName: response.data.lastName,
        birthday: response.data.date_of_birth,
        firstName: response.data.first_name,
        residency: response.data.residency,
        citizenship: response.data.citizenship,
      }
      yield put(stopSubmit(form, errors))
    } else {
      yield put(stopSubmit(form))
    }
  }
}

export function* uploadDocument() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { document } } = yield take(VERIFY.UPLOAD_DOCUMENT)
    const form = yield select(getForm)
    yield put(startSubmit(form))
    const formData = new FormData()
    formData.append('image', document, document.name)
    const response = yield call(request, `${SERVER}/api/document/`, formData, 'post', { isFileUpload: true })
    if (response.success) {
      LogRocket.track('Document upload success')
      gtm.pushVerificationNextStep('PassportScan')
      yield put(stopSubmit(form))
      yield put(actions.auth.verify.setStatus('Preliminarily Approved'))
      yield put(actions.auth.verify.setStage('loader'))
      yield delay(25000)
      yield call(getStatus)
    } else if (response.error) {
      LogRocket.track('Document upload error')
      const errors = { document: response.data.error }
      yield put(stopSubmit(form, errors))
    } else {
      LogRocket.track('Document upload error')
      yield put(stopSubmit(form))
    }
  }
}

export function* skipDocument() {
  while (true) { // eslint-disable-line fp/no-loops
    yield take(VERIFY.SKIP_DOCUMENT)
    const form = yield select(getForm)
    const data = { is_document_skipped: true }
    yield put(startSubmit(form))
    const response = yield call(request, `${SERVER}/api/account/`, data, 'put')
    if (response.success) {
      gtm.pushVerificationNextStep('SkipPassportScan')
      yield put(stopSubmit(form))
      yield put(actions.auth.verify.setStatus('Pending'))
      yield put(replace('/account'))
    } else {
      yield put(stopSubmit(form, { document: 'Internal server error' }))
    }
  }
}
