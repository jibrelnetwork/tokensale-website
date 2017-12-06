import moment from 'moment'
import { delay } from 'redux-saga'
import { replace } from 'react-router-redux'
import { put, call, take, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import * as actions from '../../actions'
import * as VERIFY from '../../constants/auth/verify'
import { SERVER } from '../.'
import { gtm, storage } from '../../services'
import request from '../request'

const getForm = (state) => `account-${state.auth.token}`

const GET_ACCOUNT_DELAY = 30000

export const computeStatus = (data) => {
  const documentUrl = data.document_url
  const isDocumentSkipped = data.is_document_skipped
  return !documentUrl && isDocumentSkipped
    ? 'WithoutDocument'
    : data.identity_verification_status || (((
      data.first_name &&
      data.last_name &&
      data.date_of_birth &&
      data.citizenship &&
      data.residency &&
      data.terms_confirmed &&
      documentUrl
    ) || data.is_identity_verified) ? 'Pending' : undefined)
    // Server can return null in identity_verification_status
    // when all verification step was completed and data sended
}

function pushRegistrationSuccessEvent(isVerified) {
  const isRegistrationSuccessEventSended = (storage.getRegistrationSuccessEventSended() === '1')

  if (isRegistrationSuccessEventSended || !isVerified) {
    return
  }

  gtm.pushRegistrationSuccess()
  storage.setRegistrationSuccessEventSended('1')
}

function* onAccountResponse({ success, data }) {
  if (success) {
    const verifyStatus = computeStatus(data)
    yield pushRegistrationSuccessEvent(data.is_identity_verified)
    yield put(actions.auth.verify.setStatus(verifyStatus))
  } else {
    yield put(actions.auth.verify.setStatus('Pending'))
    console.log('Verification request error')
  }
}

export function* getStatus(periodically = false) {
  function* makeRequest() {
    const response = yield call(request, `${SERVER}/api/account/`, null, 'get')
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
      last_name: lastName,
      first_name: firstName,
      citizenship,
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
    const {
      payload: {
        documentUrl,
        documentType,
      },
    } = yield take(VERIFY.UPLOAD_DOCUMENT)
    const form = yield select(getForm)
    const data = {
      document_url: documentUrl,
      document_type: documentType,
    }
    yield put(startSubmit(form))
    const response = yield call(request, `${SERVER}/api/account/`, data, 'put')
    if (response.success) {
      gtm.pushVerificationNextStep('PassportScan')
      yield put(stopSubmit(form))
      yield put(actions.auth.verify.setStatus('Pending'))
      yield put(actions.auth.verify.setStage('loader'))
      yield delay(25000)
      yield call(getStatus)
    } else if (response.error) {
      const errors = { document: response.data.document_url || response.data.document_type }
      yield put(stopSubmit(form, errors))
    } else {
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
      yield put(actions.auth.verify.setStatus('WithoutDocument'))
      yield put(replace('/account'))
    } else {
      yield put(stopSubmit(form, { document: 'Internal server error' }))
    }
  }
}
