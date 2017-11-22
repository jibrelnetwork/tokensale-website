import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import * as actions from '../../actions'
import request from '../request'
import { SERVER } from '../.'

const DELAY = 60000

// sync
export function* get() {
  while (true) { // eslint-disable-line fp/no-loops
    const response = yield call(request, `${SERVER}/api/account/`, null, 'get')
    if (response.success) {
      const balance = response.data.jnt_balance
      yield put(actions.account.balance.requestSuccess(balance))
    } else { console.log('Balance request error') }
    yield call(delay, DELAY)
  }
}
