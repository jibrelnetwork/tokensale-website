import { replace } from 'react-router-redux'
import { call, put, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'

import gtm from '../../services/gtm'
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
  gtm.pushProfileAddedEth()
}

function* onSendResponse(address, { success, fail, data, statusText }) {
  if (success) {
    yield sendSuccess(address)
  } else if (fail) {
    yield put(stopSubmit(FORM, { address: fail }))
  } else if (data) {
    if (data.address && (data.address.length > 0)) {
      yield put(stopSubmit(FORM, { address: data.address[0] }))
    } else if (data.detail) {
      yield put(stopSubmit(FORM, { address: data.detail }))
    } else {
      yield put(stopSubmit(FORM, { address: 'Internal server error' }))
    }
  } else {
    yield put(stopSubmit(FORM, { address: statusText }))
  }
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
    yield onSendResponse(address, response)
  }
}

export function* changeConfirm() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { operationId, token } } = yield take(ADDRESS.CHANGE_CONFIRM)
    const data = { operation_id: operationId, token }
    const response = yield call(request, `${SERVER}/api/withdraw-address/confirm/`, data, 'post')
    if (response.success) {
      yield put(replace('/welcome/change-address-confirm/success'))
    } else if (response.error) {
      yield put(replace({
        state: { message: get(['data', 'detail'], response) },
        pathname: '/welcome/change-address-confirm/fail',
      }))
    } else {
      yield put(replace('/welcome/change-address-confirm/fail'))
    }
  }
}
