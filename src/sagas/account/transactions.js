import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

import * as actions from '../../actions'
import { SERVER } from '../.'
import { gtm, storage } from '../../services'
import request from '../request'

const DELAY = 60000

function pushNewTransactionEvent(transactions) {
  const isNewTransactionEventSended = (storage.getNewTransactionEventSended() === '1')

  if (isNewTransactionEventSended || (transactions && (transactions.length === 0))) {
    return
  }

  gtm.pushNewTransaction()
  storage.setNewTransactionEventSended('1')
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
    const response = yield call(
      request,
      `${SERVER}/api/transactions/`,
      null,
      'get',
      { silent: true }
    )
    yield onGetResponse(response)
    yield call(delay, DELAY)
  }
}
