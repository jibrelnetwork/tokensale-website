import { put, take } from 'redux-saga/effects'
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

export function* setState() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { modalName, modalState } } = yield take(MODALS.CHANGE_STATE)

    yield setNewModalState({ modalName, modalState: getTempModalState(modalState) })

    // wait while opening/closing/shake animation will finish
    yield delay(modalChangeStateDelay)

    yield setNewModalState({ modalName, modalState: getNewModalState(modalState) })
  }
}
