// @flow

import type { Saga } from 'redux-saga'

// import LogRocket from 'logrocket'
import { push } from 'connected-react-router'
// import { toast } from 'react-toastify'
import { put, call, take, takeEvery } from 'redux-saga/effects'
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

const loginForm = 'login'
const registrationForm = 'registration'

type loginRequestFields = {
  email: string,
  password: string,
  captcha: string,
}

type loginResponseFields = {
  key?: string,
  non_field_errors?: Array<string>,
  captcha?: string,
}

export function* authLoginSaga(): Saga<void> {
  // eslint-disable-next-line fp/no-loops
  while (true) {
    const {
      payload: { email, password, captcha },
    }: authLoginType = yield take(AUTH_LOGIN)

    const postBody: loginRequestFields = { email: email.toLowerCase(), password, captcha }

    yield put(startSubmit(loginForm))

    try {
      const response: loginResponseFields = yield call(api.post, 'auth/login', postBody)

      if (response.key) {
        const token: string = response.key
        // LogRocket.identify(postBody.email)

        authToken.set(token)

        yield put(authSetToken(token))

        yield* accountRequestData()

        yield put(stopSubmit(loginForm))

        yield put(closeModals())

        yield* redirectAfterLogin()
      } else if (response.non_field_errors) {
        const errors = {
          captcha: response.captcha,
          password: response.non_field_errors,
        }
        if (errors.captcha) {
          grecaptcha.trackLoginError()
          window.grecaptcha.reset()
        }
        yield put(stopSubmit(loginForm, errors))
      }

    } catch (e) {
      // server error
      console.error(e)
      yield put(stopSubmit(loginForm, { password: 'Server error, please try again' }))
    }
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

export function* authCreateAccountSaga(): Saga<void> {
  // eslint-disable-next-line fp/no-loops
  while (true) {
    const {
      payload: { email, password, passwordConfirm, captcha },
    }: authCreateAccountType = yield take(AUTH_CREATE_ACCOUNT)

    const postBody: registrationRequestFields = {
      captcha,
      password,
      tracking: tracking.get(),
      email: email.toLowerCase(),
      password_confirm: passwordConfirm,
    }

    yield put(startSubmit(registrationForm))

    try {
      const response: registrationResponseFields = yield call(api.post, 'auth/registration', postBody)
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

        yield put(stopSubmit(registrationForm))
      }

    } catch (e) {
      console.error(e)
      // @TODO: Fix error handling
      yield put(stopSubmit(registrationForm, { password: 'Server error, please try again' }))
    }
  }
}

function* onLogout(): Saga<void> {
  // remove token
  authToken.remove()
  // redirect to main page
  yield put(push('/'))
}

/**
 * Saga, that on user logout
 */
export function* logoutSaga(): Saga<void> {
  yield takeEvery(AUTH_LOGOUT, onLogout)
}
