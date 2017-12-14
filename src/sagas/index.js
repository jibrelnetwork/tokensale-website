import * as account from './account'
import * as auth from './auth'
import * as sync from './sync'

export const SERVER =
  process.env.PROD // Webpack
    ? process.env.BACKEND === 'dev' // Heroku
      ? 'http://37.59.55.6:8080'
      : 'https://saleapi.jibrel.network'
    : 'http://37.59.55.6:8080'

export default function* sagas() {
  yield [
    account.address.get(),
    account.address.send(),
    account.addresses.get(),
    account.address.changeConfirm(),
    account.balance.withdraw(),
    account.balance.changeConfirm(),
    account.modals.setState(),
    account.password.set(),
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
