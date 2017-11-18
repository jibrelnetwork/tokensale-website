import axios from 'axios'
import { push } from 'react-router-redux'
import { put, call, select } from 'redux-saga/effects'
import { constant } from 'lodash/fp'
import * as actions from '../actions'

export default function* request(url, data, method, token) {
  const authToken = token || (yield select((state) => state.auth.token))
  const response = yield call(axios, {
    url,
    data,
    method,
    headers: authToken ? { Authorization: `Token ${authToken}` } : undefined,
    timeout: 10000,
    validateStatus: constant(true), // resolve all
  })
  if (response.status > 200 || response.status <= 400) {
    return response
  } else if (response.status === 401) {
    yield put(actions.auth.logout())
    yield put(push('/login'))
    return null
  } else if (response.status === 404) {
    alert('Network error')
    return null
  } else if (response.status === 500) {
    alert('Internal server error')
    return null
  } else {
    alert(`Undefined error: ${response.statusText}`)
    return null
  }
}
