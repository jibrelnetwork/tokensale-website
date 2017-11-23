import { put, call, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { startSubmit, stopSubmit } from 'redux-form'

import gtm from '../../services/gtm'
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
    yield take(BALANCE.WITHDRAW)
    yield put(startSubmit(FORM))

    const response = yield call(request, `${SERVER}/api/withdraw-jnt/`, null, 'post')

    if (response.success) {
      yield requestBalance()
      yield put(stopSubmit(FORM))
      yield closeWithdrawModal()

      gtm.pushProfileRequestWithdraw()
    } else {
      yield put(stopSubmit(FORM))
    }
  }
}
