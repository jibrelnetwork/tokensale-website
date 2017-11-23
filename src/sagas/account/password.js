import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'

import { PASSWORD, MODALS } from '../../constants/account'
import request from '../request'
import { SERVER } from '../.'

const FORM = 'set-password'

function* closeSetPasswordModal() {
  yield put({
    type: MODALS.CHANGE_STATE,
    payload: { modalName: 'setPassword', modalState: 'close' },
  })
}

export function* set() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { password, newPassword } } = yield take(PASSWORD.SET)
    const data = { old_password: password, new_password1: newPassword, new_password2: newPassword }

    yield put(startSubmit(FORM))

    const response = yield call(request, `${SERVER}/auth/password/change/`, data, 'post')

    if (response.success) {
      yield put(stopSubmit(FORM))
      yield closeSetPasswordModal()
      yield put(reset(FORM))
    } else if (response.fail) {
      yield put(stopSubmit(FORM, { newPassword: response.fail }))
    } else {
      yield put(stopSubmit(FORM, { newPassword: response.statusText }))
    }
  }
}
