import { push } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import ga from '../../services/ga'
import gtm from '../../services/gtm'
import * as REGISTER from '../../constants/auth/register'
import request from '../request'
import { SERVER } from '../.'

const FORM = 'register'

function* createAccountSuccess() {
  yield put(stopSubmit(FORM))

  gtm.pushRegistrationEmail()

  yield put(push('/welcome/email/sended'))
}

function* createAccountError(response) {
  const errors = {
    email: response.data.email,
    captcha: response.data.captcha,
    password: response.data.password,
    passwordConfirm: response.data.password_confirm,
  }

  if (errors.captcha) {
    window.grecaptcha.reset() // eslint-disable-line more/no-window
  }

  yield put(stopSubmit(FORM, errors))
}

export function* createAccount() {
  while (true) { // eslint-disable-line fp/no-loops
    const {
      payload: { email, password, passwordConfirm, captcha },
    } = yield take(REGISTER.CREATE_ACCOUNT)

    const tracking = ga.get()

    const data = {
      email,
      captcha,
      tracking,
      password,
      password_confirm: passwordConfirm,
    }

    yield put(startSubmit(FORM))

    const response = yield call(request, `${SERVER}/auth/registration/`, data, 'post')

    if (response.success) {
      yield createAccountSuccess()
    } else if (response.error) {
      yield createAccountError(response)
    } else {
      yield put(stopSubmit(FORM))
    }
  }
}
