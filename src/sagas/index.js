// import * as account from './account'
import * as auth from './auth'
// import * as sync from './sync'

import { modalsSaga } from './modals'
import { bootSaga } from './boot'

export const SERVER = 'http://localhost:8000'

export default function* sagas() {
  yield [
    bootSaga(),
    modalsSaga(),
    auth.login(),
    auth.register.createAccount(),
    /*
    account.address.get(),
    account.address.requestChange(),
    account.addresses.get(),
    account.address.changeConfirm(),
    account.balance.requestWithdraw(),
    account.balance.changeConfirm(),
    account.modals.setState(),
    account.password.changeConfirm(),
    auth.login(),
    auth.email.verify(),
    auth.email.resend(),
    auth.verify.confirmTerms(),
    auth.verify.skipDocument(),
    auth.verify.uploadDocument(),
    auth.verify.updateUserInfo(),
    auth.password.reset(),
    auth.password.change(),
    sync.raisedTokens(),
    sync.userBalance(),
    sync.userTransactions(),
    sync.accountVerifyStatus(), */
  ]
}
