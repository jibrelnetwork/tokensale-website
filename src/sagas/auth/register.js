import { push } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form'
import * as REGISTER from '../../constants/auth/register'
import * as actions from '../../actions'
import request from '../request';
import { SERVER } from '../.'

const FORM = 'register'

export function* createAccount() {
  while (true) { // eslint-disable-line fp/no-loops
    const {
      payload: { email, password, passwordConfirm, captcha },
    } = yield take(REGISTER.CREATE_ACCOUNT)
    const data = {
      email,
      captcha,
      password,
      password_confirm: passwordConfirm,
    }
    yield put(startSubmit(FORM))
    const response = yield call(request, `${SERVER}/auth/registration/`, data, 'post');
    if (response && response.status < 400) {
      yield put(actions.auth.setToken(response.data.key))
      yield put(stopSubmit(FORM))
      yield put(push('/verify'))
    } else {
      const errors = {
        email: response.data.email,
        captcha: response.data.captcha,
        password: response.data.password,
        passwordConfirm: response.data.password_confirm,
      }
      yield put(stopSubmit(FORM, errors))
    }
  }
}
