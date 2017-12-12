import { toast } from 'react-toastify'
import { replace } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import * as PASSWORD from '../../constants/auth/password'
import { SERVER } from '../.'
import request from '../request'

const forms = {
  RESET_PASSWORD: 'reset-password',
  CHANGE_PASSWORD: 'change-password',
}

export function* reset() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { email } } = yield take(PASSWORD.RESET)
    const data = { email: email.toLowerCase() }
    yield put(startSubmit(forms.RESET_PASSWORD))
    const response = yield call(request, `${SERVER}/auth/password/reset/`, data, 'post')
    yield put(stopSubmit(forms.RESET_PASSWORD))
    if (response.success) {
      yield put(replace('/welcome/password/sended'))
    } else {
      toast.error('Server error, please try again later or contact with us via email')
      console.error(response)
    }
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
    yield put(startSubmit(forms.CHANGE_PASSWORD))
    const response = yield call(request, `${SERVER}/auth/password/reset/confirm/`, data, 'post')
    if (response.success) {
      yield put(stopSubmit(forms.CHANGE_PASSWORD))
      yield put(replace('/welcome/login'))
      toast.success(response.data.detail)
    } else if (response.error) {
      const errors = {
        newPassword: response.data.new_password1,
        newPasswordConfirm: response.data.new_password2,
      }
      if (response.data.token || response.data.uid) {
        toast.error('Please try to recover your password again, your recovery link is expired ')
      }
      yield put(stopSubmit(forms.CHANGE_PASSWORD, errors))
    } else {
      toast.error("We can't reset your password, please try again later or contact us via email")
      yield put(stopSubmit(forms.CHANGE_PASSWORD))
      console.error(response)
    }
  }
}
