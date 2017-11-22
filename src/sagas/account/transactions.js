import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import * as actions from '../../actions'
import { SERVER } from '../.'
import request from '../request'

const DELAY = 60000

// sync
export function* get() {
  while (true) { // eslint-disable-line fp/no-loops
    const response = yield call(request, `${SERVER}/api/transactions/`, null, 'get')
    if (response.success) {
      const transactions = response.data
      yield put(actions.account.transactions.requestSuccess(transactions))
    } else { console.log('Transactions request error') }
    yield call(delay, DELAY)
  }
}
