import { toast } from 'react-toastify'
import { replace } from 'react-router-redux'
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
      yield put(replace('/welcome/email/verified'))
    } else {
      yield put(replace('/welcome/email/declined'))
    }
  }
}

export function* resend() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { email } } = yield take(EMAIL.RESEND)
    const data = { email: email.toLowerCase() }
    const response = yield call(request, `${SERVER}/auth/registration/confirm-email-resend/`, data, 'post')
    if (response.success) {
      yield put(replace('/welcome/email/sended'))
    } else {
      toast.error('Error on email verification resend')
    }
  }
}
