// @flow

import { put, takeEvery, call, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { modalsSelector } from '../selectors/modals'

/* ::
import type { Saga } from 'redux-saga'
import type { PopupState } from '../modules/modals'
import type { ModalState, showModalType } from '../modules/modals'
*/

import { modals } from '../modules'

const {
  MODALS_SHOW_MODAL,
  MODALS_CLOSE_ALL,
  modalSetState,
} = modals

const modalChangeStateDelay = 300

function* showModalSaga(action: showModalType): Saga<void> {
  const {
    modalName,
  } = action.payload

  const currentState: ModalState = yield select(modalsSelector)

  // this modal already opened, do nothing
  if (currentState.modalState === 'open' && currentState.modalName === modalName) {
    return
  }

  // modal already opened, replace content
  if (currentState.modalState === 'open') {
    yield put(modalSetState(modalName, 'open'))
  } else {
    // open modal with overlay
    yield put(modalSetState(modalName, 'opening'))
    yield call(delay, modalChangeStateDelay)
    yield put(modalSetState(modalName, 'open'))
  }
}

function* closeAllModalsSaga(): Saga<void> {
  const currentState: ModalState = yield select(modalsSelector)
  const { modalName } = currentState

  yield put(modalSetState(modalName, 'closing'))
  yield call(delay, modalChangeStateDelay)
  yield put(modalSetState(modalName, 'close'))
}

export function* modalsSaga(): Saga<void> {
  yield takeEvery(MODALS_SHOW_MODAL, showModalSaga)
  yield takeEvery(MODALS_CLOSE_ALL, closeAllModalsSaga)
}
