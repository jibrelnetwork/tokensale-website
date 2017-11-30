import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

import gtm from '../../services/gtm'
import * as actions from '../../actions'
import { SERVER } from '../.'
import request from '../request'

const DELAY = 60000

function pushNewTransactionEvent(transactions) {
  if (transactions && (transactions.length > 0)) {
    gtm.pushNewTransaction()
  }
}

function* onGetResponse({ success, data }) {
  if (success) {
    yield put(actions.account.transactions.requestSuccess(data))
    pushNewTransactionEvent(data)
  } else {
    console.log('Transactions request error')
  }
}

// sync
export function* get() {
  while (true) { // eslint-disable-line fp/no-loops
    const response = yield call(request, `${SERVER}/api/transactions/`, null, 'get')
    yield onGetResponse(response)
    yield call(delay, DELAY)
  }
}
