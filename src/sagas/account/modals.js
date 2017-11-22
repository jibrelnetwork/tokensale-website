import { put, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import * as MODALS from '../../constants/account/modals'

const modalChangeStateDelay = 300

function* setNewModalState(payload) {
  yield put({ type: MODALS.SET_STATE, payload })
}

export function* setState() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { modalName, modalState } } = yield take(MODALS.CHANGE_STATE)
    const isOpen = (modalState === 'open')

    yield setNewModalState({ modalName, modalState: isOpen ? 'opening' : 'closing' })

    // wait while opening/closing animation will finish
    yield delay(modalChangeStateDelay)

    yield setNewModalState({ modalName, modalState: isOpen ? 'open' : 'close' })
  }
}
