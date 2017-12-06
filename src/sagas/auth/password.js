import { toast } from 'react-toastify'
import { replace } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import * as PASSWORD from '../../constants/auth/password'
import request from '../request'
import { SERVER } from '../.'

const FORM_RESET = 'reset-password'
const FORM_CHANGE = 'change-password'

function* onResetResponse(response) {
  if (response.success) {
    yield put(replace('/welcome/password/sended'))
  } else {
    console.error(response.error || response.statusCode)
  }
}

export function* reset() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { email } } = yield take(PASSWORD.RESET)
    const data = { email: email.toLowerCase() }
    yield put(startSubmit(FORM_RESET))
    const response = yield call(request, `${SERVER}/auth/password/reset/`, data, 'post')
    yield put(stopSubmit(FORM_RESET))
    yield onResetResponse(response)
  }
}

function getChangeRequestData({ uid, token, newPassword, newPasswordConfirm }) {
  return { uid, token, new_password1: newPassword, new_password2: newPasswordConfirm }
}

function* onChangeResponse(response) {
  if (response.success) {
    yield put(replace('/welcome/login'))
  } else if (response.data.token) {
    toast.error('Please try to recover your password again, your recovery link is expired ')
  } else {
    toast.error("We can't reset your password, please contact us via email")
  }
}

export function* change() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload } = yield take(PASSWORD.CHANGE)
    const data = getChangeRequestData(payload)
    yield put(startSubmit(FORM_CHANGE))
    const response = yield call(request, `${SERVER}/auth/password/reset/confirm/`, data, 'post')
    yield put(stopSubmit(FORM_CHANGE))
    yield onChangeResponse(response)
  }
}
