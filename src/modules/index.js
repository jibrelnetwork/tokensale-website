// @flow

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import type { Reducer } from 'redux'

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SET_TOKEN,
  AUTH_SHOW_SUPPORT_LINK,
  AUTH_STATUS_REQUEST_SUCCESS,
  authLogin,
  authLogout,
  authSetToken,
  authShowSupportLink,
  authSetVerifyStatus,
  authSetVerifyStage,
  authCreateAccount,
  authReducer,
} from './auth'

import {
  RAISED_REQUEST,
  RAISED_REQUEST_CANCEL,
  RAISED_REQUEST_SUCCESS,
  raisedRequest,
  raisedRequestCancel,
  raisedRequestSuccess,
  tokensReducer,
} from './tokens'

import {
  MODALS_SHOW_MODAL,
  MODALS_CLOSE_ALL,
  showModal,
  closeModals,
  modalSetState,
  modalsReducer,
} from './modals'

import {
  ACCOUNT_DASHBOARD_TOGGLE,
  accountToggleDashboard,
  accountReducer,
} from './account'

import type { ModalState, PopupNames } from './modals'
import type { AuthState, VerificationStage, VerificationStatus } from './auth'
import type { TokenState } from './tokens'

const modulesReducer: Reducer = combineReducers({
  auth: authReducer,
  modals: modalsReducer,
  tokens: tokensReducer,
  account: accountReducer,
  form: formReducer,
})

export type State = {
  +modals: ModalState,
  +auth: AuthState,
  +tokens: TokenState,
}

export type {
  PopupNames,
  VerificationStatus,
  VerificationStage,
}

export {
  modulesReducer,
  // account
  ACCOUNT_DASHBOARD_TOGGLE,
  accountToggleDashboard,
  // auth
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SET_TOKEN,
  AUTH_SHOW_SUPPORT_LINK,
  AUTH_STATUS_REQUEST_SUCCESS,
  authLogin,
  authLogout,
  authSetToken,
  authShowSupportLink,
  authSetVerifyStatus,
  authSetVerifyStage,
  authCreateAccount,
  // modals
  MODALS_SHOW_MODAL,
  MODALS_CLOSE_ALL,
  showModal,
  closeModals,
  modalSetState,
  // tokens
  RAISED_REQUEST,
  RAISED_REQUEST_CANCEL,
  RAISED_REQUEST_SUCCESS,
  raisedRequest,
  raisedRequestCancel,
  raisedRequestSuccess,
}
