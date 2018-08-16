// @flow

import type { Saga } from 'redux-saga'

// import LogRocket from 'logrocket'
import { replace } from 'connected-react-router'
// import { toast } from 'react-toastify'
import { put, call, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import { tracking, grecaptcha, /* gtm, */ authToken, api } from '../services'

import type {
  authLoginType,
  authCreateAccountType,
  authResetPasswordType,
  authResetPasswordChangeType,
} from '../modules/auth'

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_CREATE_ACCOUNT,
  AUTH_RESET_PASSWORD,
  AUTH_RESET_PASSWORD_CHANGE,
  authSetToken,
  showModal,
  closeModals,
} from '../modules'

import { accountRequestData, redirectAfterLogin } from './accountSaga'

const LOGIN_FORM = 'login'
const REGISTRATION_FORM = 'register'
const RESET_PASSWORD_FORM = 'reset-password'
const CHANGE_PASSWORD_FORM = 'change-password'

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
    if (window.grecaptcha && errors.captcha) {
      grecaptcha.trackLoginError()
      window.grecaptcha.reset()
    }
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
  // redirect to main page
  yield put(replace('/'))

  try {
    yield call(api.post, 'auth/logout', {}, authToken.get())
  } catch (e) {
    console.error('logout error', e)
  }

  // remove token
  authToken.remove()
}

/**
 * Reset password handler
 *
 * @param {authResetPasswordType} action
 */
function* authResetPassword(action: authResetPasswordType): Saga<void> {
  const { payload: { email } } = action

  const postData = { email: email.toLowerCase() }

  try {
    yield put(startSubmit(RESET_PASSWORD_FORM))
    yield call(api.post, 'auth/password/reset', postData)
    yield put(stopSubmit(RESET_PASSWORD_FORM))
    yield put(showModal('resetPasswordEmailSended'))
  } catch (error) {
    // toast.error('Server error, please try again later or contact with us via email')
    console.error(error)
  }
}

function* authResetPasswordChange(action: authResetPasswordChangeType): Saga<void> {
  const {
    payload: {
      uid,
      token,
      newPassword,
      newPasswordConfirm,
    },
  } = action

  const postData = { uid, token, new_password1: newPassword, new_password2: newPasswordConfirm }

  yield put(startSubmit(CHANGE_PASSWORD_FORM))
  const response = yield call(api.post, 'auth/password/reset/confirm', postData)

  if (response.success) {
    yield put(stopSubmit(CHANGE_PASSWORD_FORM))
    yield put(closeModals())
    // yield put(replace( ))
    // toast.success(response.data.detail)
  } else if (response.error) {
    const errors = {
      newPassword: response.data.new_password1,
      newPasswordConfirm: response.data.new_password2,
    }
    if (response.data.token || response.data.uid) {
      // toast.error('Please try to recover your password again, your recovery link is expired ')
    }
    yield put(stopSubmit(CHANGE_PASSWORD_FORM, errors))
  } else {
    // toast.error("We can't reset your password, please try again later or contact us via email")
    yield put(stopSubmit(CHANGE_PASSWORD_FORM))
    // console.error(response)
  }
}

export function* authRootSaga(): Saga<void> {
  yield takeEvery(AUTH_LOGIN, authLogin)
  yield takeEvery(AUTH_LOGOUT, authLogout)
  yield takeEvery(AUTH_CREATE_ACCOUNT, authCreateAccount)
  yield takeEvery(AUTH_RESET_PASSWORD, authResetPassword)
  yield takeEvery(AUTH_RESET_PASSWORD_CHANGE, authResetPasswordChange)
}
