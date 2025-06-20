import * as account from './account'
import * as auth from './auth'
import * as sync from './sync'

export const SERVER = 'https://saleapi.jibrel.network'

export default function* sagas() {
  yield [
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
    auth.register.createAccount(),
    auth.password.reset(),
    auth.password.change(),
    sync.raisedTokens(),
    sync.userBalance(),
    sync.userTransactions(),
    sync.accountVerifyStatus(),
  ]
}
