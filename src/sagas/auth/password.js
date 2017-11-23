import { replace } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects'
import * as PASSWORD from '../../constants/auth/password'
import request from '../request'
import { SERVER } from '../.'

export function* reset() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { email } } = yield take(PASSWORD.RESET)
    const data = { email }
    const response = yield call(request, `${SERVER}/auth/password/reset/`, data, 'post')
    if (response.success) { yield put(replace('/welcome/password/sended')) }
  }
}

export function* change() {
  while (true) { // eslint-disable-line fp/no-loops
    const {
      payload: {
        uid,
        token,
        newPassword,
        newPasswordConfirm,
      },
    } = yield take(PASSWORD.CHANGE)
    const data = { uid, token, new_password1: newPassword, new_password2: newPasswordConfirm }
    const response = yield call(request, `${SERVER}/auth/password/reset/confirm/`, data, 'post')
    if (response.success) {
      yield put(replace('/welcome/login'))
    } else if (response.data.token) {
      alert('Please try to recover your password again, your recovery link is expired ')
    } else {
      alert("We can't reset your password, please contact us via email")
    }
  }
}
