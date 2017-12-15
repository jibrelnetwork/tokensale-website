import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as actions from '../actions'
import request from './request'
import { SERVER } from '.'

const DELAY = 300000

// synced
export function* getRaised() {
  while (true) { // eslint-disable-line fp/no-loops
    const response = yield call(
      request,
      `${SERVER}/api/raised-tokens/`,
      null,
      'get',
      { silent: true }
    )
    if (response.success) {
      const tokens = response.data.raised_tokens
      yield put(actions.tokens.raisedRequestSuccess(tokens))
    } else { console.log('Raised tokens request error') }
    yield call(delay, DELAY)
  }
}
