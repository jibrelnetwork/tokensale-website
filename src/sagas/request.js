import axios from 'axios'
import { push } from 'react-router-redux'
import { toast } from 'react-toastify'
import { constant } from 'lodash/fp'
import { put, call, select } from 'redux-saga/effects'
import * as actions from '../actions'

export default function* request(url, data, method, options = {}) {
  const authToken = options.token || (yield select((state) => state.auth.token))
  const silentMode = options.silent
  const isCustomContentType = !!options.contentType
  try {
    const response = yield call(axios, {
      url,
      data,
      method,
      timeout: 30000,
      validateStatus: constant(true), // resolve all
      headers: !authToken ? undefined : {
        Authorization: `Token ${authToken}`,
        'Content-Type': isCustomContentType ? options.contentType : 'application/json',
      },
    })
    if (response.status >= 200 && response.status < 300) {
      return { success: true, ...response }
    } else if ((response.status === 400) || (response.status === 403)) {
      return { error: true, ...response }
    } else if (response.status === 401) {
      yield put(actions.auth.logout())
      yield put(push('/login'))
      return {}
    } else if (response.status === 404) {
      if (!silentMode) { toast.error('Network error') }
      return {}
    } else if (response.status === 500) {
      if (!silentMode) { toast.error('Internal server error') }
      return {}
    } else {
      if (!silentMode) { toast.error(`Undefined error: ${response.statusText}`) }
      return {}
    }
  } catch (error) {
    if (!silentMode) { toast.error('Check your connection and try again') }
    console.error(error)
    return {}
  }
}
