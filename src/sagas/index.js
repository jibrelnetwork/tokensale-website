import * as account from './account'
import * as auth from './auth'
import * as sync from './sync'

export const SERVER = 'http://37.59.55.6:8080'

export default function* sagas() {
  yield [
    account.address.set(),
    account.addresses.get(),
    account.balance.get(),
    account.balance.withdraw(),
    account.modals.setState(),
    account.password.set(),
    account.transactions.get(),
    auth.login(),
    auth.email.verify(),
    auth.verify.confirmTerms(),
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
