import { put, call, take } from 'redux-saga/effects'
import * as actions from '../../actions'
import * as BALANCE from '../../constants/account/transactions'
import request from '../request'
import { SERVER } from '../.'

export function* get() {
  while (true) { // eslint-disable-line fp/no-loops
    yield take(BALANCE.REQUEST)
    const response = yield call(request, `${SERVER}/api/account/`, null, 'get')
    if (response.success) {
      const { balance = 0 } = response.data.jnt_balance
      yield put(actions.account.balance.requestSuccess(balance))
    } else {
      alert('Balance request error')
    }
  }
}
