import axios from 'axios'
import { push } from 'react-router-redux'
import { put, call, select } from 'redux-saga/effects'
import { constant } from 'lodash/fp'
import * as actions from '../actions'

export default function* request(url, data, method, token) {
  const authToken = token || (yield select((state) => state.auth.token))
  try {
    const response = yield call(axios, {
      url,
      data,
      method,
      headers: authToken ? { Authorization: `Token ${authToken}` } : undefined,
      timeout: 10000,
      validateStatus: constant(true), // resolve all
    })
    if (response.status >= 200 && response.status < 300) {
      return { success: true, ...response }
    } else if (response.status === 400) {
      return { error: true, ...response }
    } else if (response.status === 401) {
      yield put(actions.auth.logout())
      yield put(push('/login'))
      return {}
    } else if (response.status === 404) {
      alert('Network error') // ?
      return {}
    } else if (response.status === 500) {
      alert('Internal server error') // ?
      return {}
    } else {
      alert(`Undefined error: ${response.statusText}`) // ?
      return {}
    }
  } catch (error) {
    alert(error)
    return {}
  }
}
