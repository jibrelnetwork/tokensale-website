import * as auth from './auth'
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
    account.balance.get(),
    account.transactions.get(),
  ]
}
