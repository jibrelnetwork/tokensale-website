import { put, call, take } from 'redux-saga/effects'
import * as actions from '../actions'
import * as TOKENS from '../constants/tokens'
import request from './request'
import { SERVER } from '.'

export function* getRaised() {
  while (true) { // eslint-disable-line fp/no-loops
    yield take(TOKENS.RAISED_REQUEST)
    const response = yield call(request, `${SERVER}/api/raised-tokens/`, null, 'get')
    if (response.success) {
      const tokens = response.data.raised_tokens
      yield put(actions.tokens.raisedRequestSuccess(tokens))
    }
  }
}
