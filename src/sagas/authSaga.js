// @flow

import type { Saga } from 'redux-saga'

// import LogRocket from 'logrocket'
import { push } from 'connected-react-router'
// import { toast } from 'react-toastify'
import { put, call, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

// import request from '../request'
// import { SERVER } from '../.'
import { tracking, grecaptcha, /* gtm, */ authToken, api } from '../services'

import type { authLoginType, authCreateAccountType } from '../modules/auth'
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_CREATE_ACCOUNT,
  authSetToken,
  closeModals,
} from '../modules'

import { accountRequestData, redirectAfterLogin } from './accountSaga'

const LOGIN_FORM = 'login'
const REGISTRATION_FORM = 'register'

type loginRequestFields = {
  email: string,
  password: string,
  captcha: string,
}

type loginResponseFields = {
  key?: string,
  non_field_errors?: Array<string>,
  captcha?: string
}

function* authLogin(action: authLoginType): Saga<void> {
  const {
    payload: { email, password, captcha },
  } = action

  const postBody: loginRequestFields = { email: email.toLowerCase(), password, captcha }

  yield put(startSubmit(LOGIN_FORM))

  try {
    const response: loginResponseFields = yield call(api.post, 'auth/login', postBody)

    if (response.key) {
      const token: string = response.key
      // LogRocket.identify(postBody.email)

      authToken.set(token)

      yield put(authSetToken(token))

      yield* accountRequestData()

      yield put(stopSubmit(LOGIN_FORM))

      yield put(closeModals())

      yield* redirectAfterLogin()
    }
  } catch (e) {
    const errors = {
      captcha: e.data.captcha,
      password: e.data.non_field_errors,
    }
    if (errors.captcha) {
      grecaptcha.trackLoginError()
      window.grecaptcha.reset()
    }
    // server erros
    yield put(stopSubmit(LOGIN_FORM, errors))
  }
}

type registrationRequestFields = {
  captcha: string,
  password: string,
  email: string,
  password_confirm: string,
  /* @todo: change it, when tracking will flow covered */
  tracking: Object
}

type registrationResponseFields = {
  key?: string,
  non_field_errors?: Array<string>,
  captcha?: string,
}

/**
 * Create user account
 * @TODO: Registration is not working on the server side
 */
function* authCreateAccount(action: authCreateAccountType): Saga<void> {
  const {
    payload: { email, password, passwordConfirm, captcha },
  } = action

  const postBody: registrationRequestFields = {
    captcha,
    password,
    tracking: tracking.get(),
    email: email.toLowerCase(),
    password_confirm: passwordConfirm,
  }

  yield put(startSubmit(REGISTRATION_FORM))

  try {
    console.log(postBody)
    const response: registrationResponseFields = yield call(api.post, 'auth/registration', postBody)
    console.log(response)
    if (response.key) {
      const token = response.key
      // LogRocket.identify(postBody.email)

      if (token) {
        authToken.set(token)

        yield put(authSetToken(token))

        yield* accountRequestData()

        yield put(closeModals())

        yield* redirectAfterLogin()
      }

      yield put(stopSubmit(REGISTRATION_FORM))
    }
  } catch (e) {
    console.log(e)
    const errors = {
      email: e.data.email,
      captcha: e.data.captcha,
      password: e.data.password || e.data.non_field_errors,
    }
    if (errors.captcha) {
      grecaptcha.trackLoginError()
      window.grecaptcha.reset()
    }
    // server erros
    yield put(stopSubmit(REGISTRATION_FORM, errors))
  }
}

function* authLogout(): Saga<void> {
  // remove token
  authToken.remove()
  // redirect to main page
  yield put(push('/'))
}

export function* authRootSaga(): Saga<void> {
  yield takeEvery(AUTH_LOGIN, authLogin)
  yield takeEvery(AUTH_LOGOUT, authLogout)
  yield takeEvery(AUTH_CREATE_ACCOUNT, authCreateAccount)
}
