/* eslint-disable fp/no-loops */

import { delay } from 'redux-saga'
import { replace } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import * as actions from '../../actions'
import { SERVER } from '../.'
import { BALANCE } from '../../constants/account'
import request from '../request'
import gtm from '../../services/gtm'

const FORM = 'withdraw'
const DELAY = 60000

function* onBalanceResponse(response) {
  if (response.success) {
    const balance = response.data.jnt_balance
    yield put(actions.account.balance.requestSuccess(balance))
  } else {
    console.error(response)
  }
}

function* requestBalance() {
  const response = yield call(request, `${SERVER}/api/account/`, null, 'get', { silent: true })
  yield onBalanceResponse(response)
}

function* onRequestWithdrawResponse({ success }) {
  if (success) {
    yield requestBalance()
    yield put({ type: BALANCE.WITHDRAW_REQUESTED, payload: { isWithdrawRequested: true } })
    yield put(stopSubmit(FORM))

    gtm.pushProfileRequestWithdraw()
  } else {
    yield put(stopSubmit(FORM))
  }
}

export function* get() {
  while (true) {
    yield requestBalance()
    yield delay(DELAY)
  }
}

export function* requestWithdraw() {
  while (true) {
    yield take(BALANCE.REQUEST_WITHDRAW)
    yield put(startSubmit(FORM))

    const response = yield call(request, `${SERVER}/api/withdraw-jnt/`, null, 'post')
    yield onRequestWithdrawResponse(response)
  }
}

export function* changeConfirm() {
  while (true) {
    const { payload: { operationId, token } } = yield take(BALANCE.WITHDRAW_CONFIRM)
    const data = { operation_id: operationId, token }
    const response = yield call(request, `${SERVER}/api/withdraw-jnt/confirm/`, data, 'post')

    if (response.success) {
      yield put(replace('/welcome/withdraw-confirm/success'))
    } else if (response.error) {
      yield put(replace({
        state: { message: get(['data', 'detail'], response) },
        pathname: '/welcome/withdraw-confirm/fail',
      }))
    } else {
      yield put(replace('/welcome/withdraw-confirm/fail'))
    }
  }
}

/* eslint-enable fp/no-loops */
