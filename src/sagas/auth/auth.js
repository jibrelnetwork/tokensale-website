import LogRocket from 'logrocket'
import { push } from 'react-router-redux'
import { toast } from 'react-toastify'
import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import request from '../request'
import * as AUTH from '../../constants/auth'
import * as actions from '../../actions'
import { SERVER } from '../.'
import { grecaptcha, gtm } from '../../services'

const FORM = 'login'

export function* getUserData(token) {
  const response = yield call(request, `${SERVER}/api/account/`, null, 'get', { token })
  if (response.success) {
    const verifyStatus = response.data.identity_verification_status
    const data = {
      isTermsConfirmed: response.data.terms_confirmed,
      isUserInfoFilled:
        !!response.data.first_name &&
        !!response.data.last_name &&
        !!response.data.date_of_birth &&
        !!response.data.citizenship &&
        !!response.data.residency,
      isDocumentUploaded: !!response.data.document_url,
    }
    yield put(actions.auth.verify.setStatus(verifyStatus))
    if (!data.isTermsConfirmed) {
      yield put(actions.auth.verify.setStage('terms'))
    } else if (!data.isUserInfoFilled) {
      yield put(actions.auth.verify.setStage('user-info'))
    } else if (!data.isDocumentUploaded || (verifyStatus === 'Declined')) {
      yield put(actions.auth.verify.setStage('document'))
    }
    yield put(stopSubmit(FORM))
    yield put(actions.auth.setToken(token))
    yield put(verifyStatus ? push('/account') : push('/verify'))
    gtm.pushAuthSuccess(verifyStatus === 'Approved')
  } else {
    yield put(stopSubmit(FORM))
    toast.error('Account info request error')
  }
}

export function* login() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { email, password, captcha } } = yield take(AUTH.LOGIN)
    const data = { email: email.toLowerCase(), password, captcha }
    yield put(startSubmit(FORM))
    const response = yield call(request, `${SERVER}/auth/login/`, data, 'post')
    if (response.success) {
      const token = response.data.key
      LogRocket.identify(data.email)
      if (token) {
        yield call(getUserData, token)
      }
    } else if (response.error) {
      const errors = {
        captcha: response.data.captcha,
        password: response.data.non_field_errors,
      }
      if (errors.captcha) {
        grecaptcha.trackLoginError()
        window.grecaptcha.reset()
      }
      yield put(stopSubmit(FORM, errors))
    } else {
      yield put(stopSubmit(FORM))
    }
  }
}
