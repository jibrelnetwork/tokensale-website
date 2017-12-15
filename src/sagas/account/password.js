import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'

import request from '../request'
import { SERVER } from '../.'
import { PASSWORD, MODALS } from '../../constants/account'

const FORM = 'set-password'

function* closeSetPasswordModal() {
  yield put({
    type: MODALS.CHANGE_STATE,
    payload: { modalName: 'setPassword', modalState: 'close' },
  })
}

function getSetPasswordRequestData({ password, newPassword }) {
  return { old_password: password, new_password1: newPassword, new_password2: newPassword }
}

function* onSetResponse({ success, statusText, data }) {
  const { old_password: password, new_password2: newPassword } = data

  if (success) {
    yield put(stopSubmit(FORM))
    yield closeSetPasswordModal()
    yield put(reset(FORM))
  } else if (password) {
    yield put(stopSubmit(FORM, { password }))
  } else if (newPassword) {
    yield put(stopSubmit(FORM, { newPassword }))
  } else {
    yield put(stopSubmit(FORM, { password: statusText }))
  }
}

export function* set() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload } = yield take(PASSWORD.SET)
    const data = getSetPasswordRequestData(payload)

    yield put(startSubmit(FORM))

    const response = yield call(request, `${SERVER}/auth/password/change/`, data, 'post')
    yield onSetResponse(response)
  }
}
