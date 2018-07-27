import { put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import * as MODALS from '../../constants/account/modals'

const modalChangeStateDelay = 300

function* setNewModalState(payload) {
  yield put({ type: MODALS.SET_STATE, payload })
}

function getTempModalState(modalState) {
  switch (modalState) {
    case 'open':
      return 'opening'
    case 'close':
      return 'closing'
    case 'shake':
      return 'shake'
    default:
      return 'closing'
  }
}

function getNewModalState(modalState) {
  switch (modalState) {
    case 'open':
      return 'open'
    case 'close':
      return 'close'
    case 'shake':
      return 'open'
    default:
      return 'close'
  }
}

function* updateModals(action) {
  const { payload: { modalName, modalState } } = action

  yield setNewModalState({ modalName, modalState: getTempModalState(modalState) })

  // wait while opening/closing/shake animation will finish
  yield delay(modalChangeStateDelay)

  yield setNewModalState({ modalName, modalState: getNewModalState(modalState) })
}

export function* setState() {
  yield takeEvery(MODALS.CHANGE_STATE, updateModals)
}
