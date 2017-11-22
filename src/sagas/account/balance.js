import { put, call, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { startSubmit, stopSubmit, reset } from 'redux-form'

import * as actions from '../../actions'
import { BALANCE, MODALS } from '../../constants/account'
import request from '../request'
import { SERVER } from '../.'

const FORM = 'withdraw'
const DELAY = 60000

function* requestBalance() {
  const response = yield call(request, `${SERVER}/api/account/`, null, 'get')

  if (response.success) {
    const balance = response.data.jnt_balance
    yield put(actions.account.balance.requestSuccess(balance))
  } else {
    console.error(response)
  }
}

function* closeWithdrawModal() {
  yield put({
    type: MODALS.CHANGE_STATE,
    payload: { modalName: FORM, modalState: 'close' },
  })
}

export function* get() {
  while (true) { // eslint-disable-line fp/no-loops
    yield requestBalance()
    yield delay(DELAY)
  }
}

export function* withdraw() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { address, amount } } = yield take(BALANCE.WITHDRAW)
    const data = { address, amount: parseFloat(amount, 10) }

    yield put(startSubmit(FORM))

    const response = yield call(request, `${SERVER}/api/withdraw/`, data, 'post')

    if (response.success) {
      yield requestBalance()
      yield put(stopSubmit(FORM))
      yield closeWithdrawModal()
      yield put(reset(FORM))
    } else if (response.fail) {
      yield put(stopSubmit(FORM, { amount: response.fail }))
    } else {
      yield put(stopSubmit(FORM, { amount: response.statusText }))
    }
  }
}
