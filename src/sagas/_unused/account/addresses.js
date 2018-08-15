import { put, call, take } from 'redux-saga/effects'
import * as ADDRESSES from '../../constants/account/addresses'
import * as actions from '../../actions'
import request from '../request'
import { SERVER } from '../.'

export function* get() {
  while (true) { // eslint-disable-line fp/no-loops
    yield take(ADDRESSES.REQUEST)
    const response = yield call(request, `${SERVER}/api/account/`, null, 'get')
    if (response.success) {
      const ethAddress = response.data.eth_address
      const btcAddress = response.data.btc_address
      yield put(actions.account.addresses.requestSuccess(ethAddress, btcAddress))
    } else { console.log('Addresses request error') }
  }
}
