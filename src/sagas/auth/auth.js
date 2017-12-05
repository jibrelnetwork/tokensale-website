import { push } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import LogRocket from 'logrocket'

import * as AUTH from '../../constants/auth'
import * as actions from '../../actions'
import { computeStatus } from './verify'
import { SERVER } from '../.'
import request from '../request'
import gtm from '../../services/gtm'

const FORM = 'login'

function* getUserData(token) {
  const response = yield call(request, `${SERVER}/api/account/`, null, 'get', token)
  if (response.success) {
    const verifyStatus = computeStatus(response.data)
    const data = {
      isVerified: response.data.is_identity_verified,
      verifyStatus,
      isTermsConfirmed: response.data.terms_confirmed,
      isUserInfoFilled:
        !!response.data.first_name &&
        !!response.data.last_name &&
        !!response.data.date_of_birth &&
        !!response.data.citizenship &&
        !!response.data.residency,
      isDocumentUploaded: !!response.data.document_url,
    }
    yield put(actions.auth.verify.setStatus(data.verifyStatus))
    if (!data.isTermsConfirmed) {
      yield put(actions.auth.verify.setStage('terms'))
    } else if (!data.isUserInfoFilled) {
      yield put(actions.auth.verify.setStage('user-info'))
    } else if (!data.isDocumentUploaded || verifyStatus === 'Declined') {
      yield put(actions.auth.verify.setStage('document'))
    }
    yield put(stopSubmit(FORM))
    yield put(actions.auth.setToken(token))
    yield put(data.verifyStatus ? push('/account') : push('/verify'))
    gtm.pushAuthSuccess(data.isVerified)
  } else {
    yield put(stopSubmit(FORM))
    alert('Account info request error')
  }
}

export function* login() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { email, password } } = yield take(AUTH.LOGIN)
    const data = { email: email.toLowerCase(), password }
    yield put(startSubmit(FORM))
    const response = yield call(request, `${SERVER}/auth/login/`, data, 'post')
    if (response.success) {
      const token = response.data.key
      LogRocket.identify(data.email)
      if (token) {
        yield call(getUserData, token)
      }
    } else if (response.error) {
      yield put(stopSubmit(FORM, { password: response.data.non_field_errors }))
    } else {
      yield put(stopSubmit(FORM, { email: 'Internal server error' }))
    }
  }
}
