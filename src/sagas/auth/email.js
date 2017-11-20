import { push } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects'
import * as EMAIL from '../../constants/auth/email'
import request from '../request'
import { SERVER } from '../.'

export function* verify() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { key } } = yield take(EMAIL.VERIFY)
    const data = { key }
    const response = yield call(request, `${SERVER}/auth/registration/verify-email/`, data, 'post')
    if (response.success) {
      yield put(push('/welcome/email/verified'))
    } else {
      yield put(push('/welcome/email/declined'))
    }
  }
}
