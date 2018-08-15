// @flow
import type { Saga } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { authToken } from '../../services'
import { AUTH_LOGOUT } from '../../modules'

function* onLogoutSaga(): Saga<void> {
  // remove token
  authToken.remove()
  // redirect to main page
  yield put(push('/'))
}

/**
 * Saga, that on user logout
 */
export default function* logoutSaga(): Saga<void> {
  yield takeEvery(AUTH_LOGOUT, onLogoutSaga)
}
