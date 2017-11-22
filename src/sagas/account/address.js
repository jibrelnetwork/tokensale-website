import { put, take } from 'redux-saga/effects'
import { reset } from 'redux-form'

import { ADDRESS, MODALS } from '../../constants/account'

function* closeSetAddressModal() {
  yield put({
    type: MODALS.CHANGE_STATE,
    payload: { modalName: 'setAddress', modalState: 'close' },
  })
}

export function* set() {
  while (true) { // eslint-disable-line fp/no-loops
    yield take(ADDRESS.SET)

    yield closeSetAddressModal()
    yield put(reset('set-address'))
  }
}
