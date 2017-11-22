import { push } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import * as actions from '../../actions'
import * as AUTH from '../../constants/auth'
import request from '../request'
import { SERVER } from '../.'

const FORM = 'login'

function* getUserData(token) {
  const response = yield call(request, `${SERVER}/api/account/`, null, 'get', token)
  if (response.success) {
    const data = {
      verifyStatus: response.data.identity_verification_status || 'Pending', // ?
      isTermsConfirmed: response.data.terms_confirmed,
      isUserInfoFilled:
        !!response.data.first_name &&
        !!response.data.last_name &&
        !!response.data.date_of_birth &&
        !!response.data.citizenship &&
        !!response.data.residency,
      idDocumentUploaded: !!response.data.document_url,
    }
    if (!data.isTermsConfirmed) {
      yield put(actions.auth.verify.setStage('terms'))
    } else if (!data.isUserInfoFilled) {
      yield put(actions.auth.verify.setStage('user-info'))
    } else if (!data.idDocumentUploaded) {
      yield put(actions.auth.verify.setStage('document'))
    } else { yield put(actions.auth.verify.setStatus(data.verifyStatus)) }
    yield put(stopSubmit(FORM))
    yield put(actions.auth.setToken(token))
    yield put(data.verifyStatus ? push('/account') : push('/verify'))
  } else {
    yield put(stopSubmit(FORM))
    alert('Account info request error')
  }
}

export function* login() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { email, password } } = yield take(AUTH.LOGIN)
    const data = { email, password }
    yield put(startSubmit(FORM))
    const response = yield call(request, `${SERVER}/auth/login/`, data, 'post')
    if (response.success) {
      const token = response.data.key
      if (token) { yield call(getUserData, token) }
    } else if (response.error) {
      const errors = { password: response.data.non_field_errors }
      yield put(stopSubmit(FORM, errors))
    } else {
      yield put(stopSubmit(FORM))
    }
  }
}
