import { delay } from 'redux-saga'
import { replace } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import gtm from '../../services/gtm'
import request from '../request'
import { SERVER } from '../.'
import * as actions from '../../actions'
import { BALANCE, MODALS } from '../../constants/account'

const FORM = 'withdraw'
const DELAY = 60000

function* requestBalance() {
  const response = yield call(
    request,
    `${SERVER}/api/account/`,
    null,
    'get',
    { silent: true }
  )
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

export function* changeConfirm() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { operationId, token } } = yield take(BALANCE.WITHDRAW_CONFIRM)
    const data = { operation_id: operationId, token }
    const response = yield call(request, `${SERVER}/api/withdraw-jnt/confirm/`, data, 'post')
    if (response.success) {
      yield put(replace('/welcome/withdraw-confirm/success'))
    } else {
      yield put(replace('/welcome/withdraw-confirm/fail'))
      console.error(response)
    }
  }
}
