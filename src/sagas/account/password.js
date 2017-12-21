import { put, call, take, select } from 'redux-saga/effects'

import request from '../request'
import { SERVER } from '../.'
import { PASSWORD } from '../../constants/account'
import * as actions from '../../actions'

export function* changeConfirm() {
  while (true) { // eslint-disable-line fp/no-loops
    yield take(PASSWORD.CHANGE_CONFIRM_REQUEST)
    const email = yield select((state) => state.account.dashboard.accountData.email)
    const response = yield call(request, `${SERVER}/auth/password/reset/`, { email }, 'post')
    if (response.success) {
      yield put(actions.account.password.changeConfirmSuccess())
    } else if (response.error) {
      yield put(actions.account.password.changeConfirmFailure(response.data.detail))
    } else {
      yield put(actions.account.password.changeConfirmFailure())
    }
  }
}
