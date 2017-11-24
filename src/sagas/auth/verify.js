import moment from 'moment'
import { delay } from 'redux-saga'
import { put, call, take, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import gtm from '../../services/gtm'
import * as VERIFY from '../../constants/auth/verify'
import * as actions from '../../actions'
import request from '../request'
import { SERVER } from '../.'

const getForm = (state) => `account-${state.auth.token}`

const DELAY = 30000

export function* getStatus(periodically = false) {
  function* makeRequest() {
    const response = yield call(request, `${SERVER}/api/account/`, null, 'get')
    if (response.success) {
      const status = response.data.identity_verification_status
      const isVerified = response.data.is_identity_verified
      if (isVerified) { gtm.pushRegistrationSuccess() }
      yield put(actions.auth.verify.setStatus(status || 'Pending')) // ?
    } else {
      yield put(actions.auth.verify.setStatus('Pending'))
      console.log('Verification request error')
    }
  }
  if (periodically) {
    while (true) { // eslint-disable-line fp/no-loops
      yield call(makeRequest)
      yield call(delay, DELAY)
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
    const { payload: { documentUrl } } = yield take(VERIFY.UPLOAD_DOCUMENT)
    const form = yield select(getForm)
    const data = { document_url: documentUrl }
    yield put(startSubmit(form))
    const response = yield call(request, `${SERVER}/api/account/`, data, 'put')
    if (response.success) {
      yield put(stopSubmit(form))
      gtm.pushVerificationNextStep('PassportScan')
      yield put(actions.auth.verify.setStatus('Pending'))
      yield put(actions.auth.verify.setStage('loader'))
      yield delay(25000)
      yield call(getStatus)
    } else if (response.error) {
      const errors = { documentUrl: response.data.document_url }
      yield put(stopSubmit(form, errors))
    } else {
      yield put(stopSubmit(form))
    }
  }
}
