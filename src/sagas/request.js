import axios from 'axios'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import { constant } from 'lodash/fp'
import { put, call, select } from 'redux-saga/effects'

import { authLogout } from '../modules'

export default function* request(url, data, method, options = {}) {
  const authToken = options.token || (yield select((state) => state.auth.token))
  const { isFileUpload } = options
  const silentMode = options.silent
  try {
    const response = yield call(axios, {
      url,
      data,
      method,
      headers: {
        Authorization: authToken
          ? `Token ${authToken}`
          : undefined,
        'Content-Type': isFileUpload
          ? 'multipart/form-data'
          : 'application/json',
      },
      timeout: isFileUpload ? 90000 : 30000,
      validateStatus: constant(true), // resolve all
    })
    if (response.status >= 200 && response.status < 300) {
      return { success: true, ...response }
    } else if ([400, 403].includes(response.status)) {
      return { error: true, ...response }
    } else if (response.status === 401) {
      yield put(authLogout())
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
