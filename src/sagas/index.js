import * as auth from './auth';

export const SERVER = 'http://37.59.55.6:8080'

export default function* sagas() {
  yield [
    auth.login(),
    auth.register.confirmTerms(),
    auth.register.createAccount(),
    auth.register.uploadDocument(),
    auth.register.updateUserInfo(),
  ];
}
