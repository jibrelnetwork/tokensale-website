// @flow

export type PopupNames = 'login' |
  'register' |
  'resetPasswordEmail' |
  'resetPassword'

export type PopupState = 'close' | 'open' | 'shake' | 'opening' | 'closing'

/**
 * MODALS_SHOW_MODAL
 */
export const MODALS_SHOW_MODAL = '@modals/show'

/* ::
export type showModalType = {
  type: '@modals/show',
  payload: {
    modalName: PopupNames,
  }
}
*/

export const showModal = (modalName: PopupNames): showModalType => ({
  type: MODALS_SHOW_MODAL,
  payload: {
    modalName,
  },
})

/**
 * MODALS_CLOSE_ALL
 */
export const MODALS_CLOSE_ALL = '@modals/close'

/* ::
export type closeModalsType = {
  type: '@modals/close',
}
*/

export const closeModals = (): closeModalsType => ({
  type: MODALS_CLOSE_ALL,
})

/**
 * MODALS_SET_STATE
 */
export const MODALS_SET_STATE = '@modals/setState'

/* ::
export type modalStateActionType = {
  type: '@modals/setState',
  payload: {
    modalName: ?PopupNames,
    modalState: PopupState,
  }
}
*/

export const modalSetState = (modalName: ?PopupNames, newState: PopupState): modalStateActionType => ({
  type: MODALS_SET_STATE,
  payload: {
    modalName,
    modalState: newState,
  },
})

/**
 * Reducer
 */
export type ModalState = {
  modalName: PopupNames | null,
  modalState: PopupState | null
}

type modalsActionType = modalStateActionType | closeModalsType | showModalType

const defaultState: ModalState = {
  modalName: null,
  modalState: null,
}

export const modalsReducer = (state: ModalState = defaultState, action: modalsActionType): ModalState => {
  switch (action.type) {

    case MODALS_SET_STATE: {
      const { modalName, modalState } = action.payload
      return {
        ...state,
        modalName: modalName || null,
        modalState,
      }
    }

    default:
      return state
  }
}

export default modalsReducer
