import * as auth from './auth'
import * as tokens from './tokens'
import * as account from './account'

export const SERVER = 'http://37.59.55.6:8080'

export default function* sagas() {
  yield [
    auth.login(),
    auth.email.verify(),
    auth.verify.confirmTerms(),
    auth.verify.uploadDocument(),
    auth.verify.updateUserInfo(),
    auth.register.createAccount(),
    auth.password.reset(),
    auth.password.change(),
    tokens.getRaised(),
    account.address.set(),
    account.balance.get(),
    account.balance.withdraw(),
    account.modals.setState(),
    account.password.set(),
    account.transactions.get(),
  ]
}
