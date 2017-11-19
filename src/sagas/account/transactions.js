import { /* put, */ call, take } from 'redux-saga/effects';
// import * as actions from '../actions'
import * as TRANSACTIONS from '../../constants/account/transactions'
import request from '../request';
import { SERVER } from '../.'

export function* download() {
  while (true) { // eslint-disable-line fp/no-loops
    yield take(TRANSACTIONS.DOWNLOAD)
    const response = yield call(request, `${SERVER}/api/transactions/`, null, 'get');
    if (response && response.status < 400) {
      // const transactions = response.data
      // yield put(actions.account.transactions.downloadSuccess(transactions))
    } else {
      alert('Transactions request error')
    }
  }
}
