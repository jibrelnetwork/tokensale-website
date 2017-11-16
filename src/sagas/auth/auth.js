import { push } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form'
import * as actions from '../../actions'
import * as AUTH from '../../constants/auth'
import request from '../request';
import { SERVER } from '../.'

const FORM = 'login'

export function* login() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { email, password } } = yield take(AUTH.LOGIN)
    const data = { email, password }
    yield put(startSubmit(FORM))
    const response = yield call(request, `${SERVER}/auth/login/`, data, 'post');
    if (response && response.status < 400) {
      yield put(stopSubmit(FORM))
      const token = response.data.key
      yield put(actions.auth.setToken(token))
      yield put(push('/account'))
    } else {
      const errors = { password: response.data.non_field_errors }
      yield put(stopSubmit(FORM, errors))
    }
  }
}
