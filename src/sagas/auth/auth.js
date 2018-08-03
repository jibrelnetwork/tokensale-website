// @flow

import type { Saga } from 'redux-saga'

import LogRocket from 'logrocket'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import request from '../request'
import { SERVER } from '../.'
import { grecaptcha, gtm, authToken } from '../../services'

import type { authLoginType } from '../../modules/auth'
import {
  AUTH_LOGIN,
  authSetToken,
  authSetVerifyStatus,
  authSetVerifyStage,
  closeModals,
} from '../../modules'

const FORM = 'login'

export function* getUserData(token: string): Saga<void> {
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

    yield put(authSetVerifyStatus(verifyStatus))

    if (!data.isTermsConfirmed) {
      yield put(authSetVerifyStage('terms'))
    } else if (!data.isUserInfoFilled) {
      yield put(authSetVerifyStage('user-info'))
    } else if (!data.isDocumentUploaded || (verifyStatus === 'Declined')) {
      yield put(authSetVerifyStage('document'))
    }

    yield put(stopSubmit(FORM))

    yield put(closeModals())

    yield put(verifyStatus ? push('/account') : push('/verify'))

    gtm.pushAuthSuccess(verifyStatus === 'Approved')
  } else {
    yield put(stopSubmit(FORM))

    toast.error('Account info request error')
  }
}

type loginRequestFields = {
  email: string,
  password: string,
  captcha: string,
}

export function* login(): Saga<void> {
  // check if we have token in the local storage and set it to redux

  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { email, password, captcha } }: authLoginType = yield take(AUTH_LOGIN)

    const data: loginRequestFields = { email: email.toLowerCase(), password, captcha }

    yield put(startSubmit(FORM))

    const response = yield call(request, `${SERVER}/auth/login/`, data, 'post')

    if (response.success) {
      const token = response.data.key
      LogRocket.identify(data.email)
      if (token) {
        // set/update auth token
        authToken.set(token)

        yield put(authSetToken(token))

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
