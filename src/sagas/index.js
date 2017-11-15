import * as register from './register';

export default function* sagas() {
  yield [
    register.confirmTerms(),
    register.createAccount(),
    register.uploadDocument(),
    register.updateUserInfo(),
  ];
}
