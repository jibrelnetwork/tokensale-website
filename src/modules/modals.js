// @flow

export type PopupNames = 'login' |
  'register' |
  'resetPasswordEmail' |
  'resetPassword' |
  "resetPasswordEmailSended" |
  "resetPasswordChange" |
  'documentSkipUpload' |
  "withdraw" |
  "kyc-status" |
  "set-address" |
  "set-address-success"

export type PopupState = 'close' | 'open' | 'shake' | 'opening' | 'closing'

/**
 * MODALS_SHOW_MODAL
 */
export const MODALS_SHOW_MODAL = '@modals/show'

export type showModalType = {
  type: '@modals/show',
  payload: {
    modalName: PopupNames,
  }
}

export function showModal(modalName: PopupNames): showModalType {
  return {
    type: MODALS_SHOW_MODAL,
    payload: {
      modalName,
    },
  }
}


/**
 * MODALS_CLOSE_ALL
 */
export const MODALS_CLOSE_ALL = '@modals/close'

export type closeModalsType = {
  type: '@modals/close',
}

export function closeModals(): closeModalsType {
  return {
    type: MODALS_CLOSE_ALL,
  }
}

/**
 * MODALS_SET_STATE
 */
export const MODALS_SET_STATE = '@modals/setState'

export type modalStateActionType = {
  type: '@modals/setState',
  payload: {
    modalName: ?PopupNames,
    modalState: PopupState,
  }
}

export function modalSetState(modalName: ?PopupNames, newState: PopupState): modalStateActionType {
  return {
    type: MODALS_SET_STATE,
    payload: {
      modalName,
      modalState: newState,
    },
  }
}

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
  modalState: 'close',
}

export function modalsReducer(state: ModalState = defaultState, action: modalsActionType): ModalState {
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
