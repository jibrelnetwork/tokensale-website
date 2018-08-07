// @flow
import type { Saga } from 'redux-saga'
import { put } from 'redux-saga/effects'

import { authToken } from '../services'
import { authLogout, authSetToken } from '../modules'
import { accountRequestData } from './accountSaga'

/**
 * Saga, that runs once on application init
 */
export function* bootSaga(): Saga<void> {
  // get auth token
  const token: string = authToken.get()

  if (token) {
    // if we have token - set it to auth redux storage
    yield put(authSetToken(token))
    // request account from the server
    try {
      yield* accountRequestData()
    } catch (e) {
      yield put(authLogout())
    }
  }
}
