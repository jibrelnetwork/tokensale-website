/* eslint-disable fp/no-loops */

import { replace } from 'connected-react-router'
import { call, put, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'

import { SERVER } from '../.'
import { ADDRESS } from '../../constants/account'
import request from '../request'
import gtm from '../../services/gtm'

const FORM = 'set-address'

function* set(address) {
  yield put({ type: ADDRESS.SET, payload: { address } })
}

function* requestChangeSuccess() {
  yield put({ type: ADDRESS.CHANGE_REQUESTED, payload: { isAddressChangeRequested: true } })
  yield put(stopSubmit(FORM))
  yield put(reset(FORM))

  gtm.pushProfileAddedEth()
}

function* onRequestChangeResponse({ success, fail, data, statusText }) {
  if (success) {
    yield requestChangeSuccess()
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
  while (true) {
    yield take(ADDRESS.GET)
    const response = yield call(request, `${SERVER}/api/withdraw-address/`, null, 'get')

    if (response.success) {
      yield set(response.data.address)
    }
  }
}

export function* requestChange() {
  while (true) {
    const { payload: { address } } = yield take(ADDRESS.REQUEST_CHANGE)

    yield put(startSubmit(FORM))

    const response = yield call(request, `${SERVER}/api/withdraw-address/`, { address }, 'put')
    yield onRequestChangeResponse(response)
  }
}

export function* changeConfirm() {
  while (true) {
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

/* eslint-enable fp/no-loops */
