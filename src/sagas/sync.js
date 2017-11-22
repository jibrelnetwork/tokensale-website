import { take, fork, cancel } from 'redux-saga/effects'
import * as TRANSACTIONS from '../constants/account/transactions'
import * as BALANCE from '../constants/account/balance'
import * as TOKENS from '../constants/tokens'
import * as VERIFY from '../constants/auth/verify'

import * as tokens from './tokens'
import * as verify from './auth/verify'
import * as balance from './account/balance'
import * as transactions from './account/transactions'

/* eslint-disable fp/no-loops */
export function* raisedTokens() {
  while (yield take(TOKENS.RAISED_REQUEST)) {
    const task = yield fork(tokens.getRaised)
    yield take(TOKENS.RAISED_REQUEST_CANCEL)
    yield cancel(task)
  }
}

export function* userBalance() {
  while (yield take(BALANCE.REQUEST)) {
    const task = yield fork(balance.get)
    yield take(BALANCE.REQUEST_CANCEL)
    yield cancel(task)
  }
}

export function* userTransactions() {
  while (yield take(TRANSACTIONS.REQUEST)) {
    const task = yield fork(transactions.get)
    yield take(TRANSACTIONS.REQUEST_CANCEL)
    yield cancel(task)
  }
}

export function* accountVerifyStatus() {
  while (yield take(VERIFY.STATUS_REQUEST)) {
    const task = yield fork(verify.getStatus, true)
    yield take(VERIFY.STATUS_REQUEST_CANCEL)
    yield cancel(task)
  }
}
/* eslint-enable */
