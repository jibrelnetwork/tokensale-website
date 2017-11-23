import { call, put, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'

import { ADDRESS, MODALS } from '../../constants/account'
import request from '../request'
import { SERVER } from '../.'

const FORM = 'set-address'

function* closeSetAddressModal() {
  yield put({
    type: MODALS.CHANGE_STATE,
    payload: { modalName: 'setAddress', modalState: 'close' },
  })
}

function* set(address) {
  yield put({ type: ADDRESS.SET, payload: { address } })
}

function* sendSuccess(address) {
  yield set(address)
  yield put(stopSubmit(FORM))
  yield closeSetAddressModal()
  yield put(reset(FORM))
}

export function* get() {
  while (true) { // eslint-disable-line fp/no-loops
    yield take(ADDRESS.GET)

    const response = yield call(request, `${SERVER}/api/withdraw-address/`, null, 'get')

    if (response.success) {
      yield set(response.data.address)
    }
  }
}

export function* send() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { address } } = yield take(ADDRESS.SEND)

    yield put(startSubmit(FORM))

    const response = yield call(request, `${SERVER}/api/withdraw-address/`, { address }, 'put')

    if (response.success) {
      yield sendSuccess(address)
    } else if (response.fail) {
      yield put(stopSubmit(FORM, { address: response.fail }))
    } else {
      yield put(stopSubmit(FORM, { address: response.statusText }))
    }
  }
}
