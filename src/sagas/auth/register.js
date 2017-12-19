import LogRocket from 'logrocket'
import { push } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import request from '../request'
import * as REGISTER from '../../constants/auth/register'
import { SERVER } from '../.'
import { getUserData } from './auth'
import { grecaptcha, gtm, tracking } from '../../services'

const FORM = 'register'

export function* createAccount() {
  while (true) { // eslint-disable-line fp/no-loops
    const {
      payload: { email, password, passwordConfirm, captcha },
    } = yield take(REGISTER.CREATE_ACCOUNT)

    const data = {
      captcha,
      password,
      tracking: tracking.get(),
      email: email.toLowerCase(),
      password_confirm: passwordConfirm,
    }

    yield put(startSubmit(FORM))

    const response = yield call(request, `${SERVER}/auth/registration/`, data, 'post')

    if (response.success) {
      const token = response.data.key
      LogRocket.identify(data.email)

      if (token) {
        yield getUserData(token)
      }

      gtm.pushRegistrationEmail()

      yield put(stopSubmit(FORM))
      yield put(push('/welcome/email/sended'))
    } else if (response.error) {
      const errors = {
        email: response.data.email,
        captcha: response.data.captcha,
        password: response.data.password,
        passwordConfirm: response.data.password_confirm,
      }

      if (errors.captcha) {
        grecaptcha.trackRegisterError()
        window.grecaptcha.reset()
      }

      yield put(stopSubmit(FORM, errors))
    } else {
      yield put(stopSubmit(FORM))
    }
  }
}
