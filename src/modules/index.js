// @flow

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import type { Reducer } from 'redux'

import { authReducer } from './auth'
import { tokensReducer } from './tokens'
import { modalsReducer } from './modals'
import { accountReducer } from './account'

import type { ModalState, PopupNames } from './modals'
import type { AuthState, VerificationStage, VerificationStatus } from './auth'
import type { TokenState } from './tokens'
import type { AccountState } from './account'

export {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SET_TOKEN,
  AUTH_SHOW_SUPPORT_LINK,
  AUTH_CREATE_ACCOUNT,
  AUTH_CONFIRM_TERMS,
  authLogin,
  authLogout,
  authSetToken,
  authShowSupportLink,
  authCreateAccount,
  authConfirmTerms,
} from './auth'

export {
  RAISED_REQUEST,
  RAISED_REQUEST_CANCEL,
  RAISED_REQUEST_SUCCESS,
  raisedRequest,
  raisedRequestCancel,
  raisedRequestSuccess,
} from './tokens'

export {
  MODALS_SHOW_MODAL,
  MODALS_CLOSE_ALL,
  showModal,
  closeModals,
  modalSetState,
} from './modals'

export {
  ACCOUNT_DASHBOARD_TOGGLE,
  ACCOUNT_BALANCE_WITHDRAW_REQUESTED,
  ACCOUNT_BALANCE_REQUEST_SUCCESS,
  ACCOUNT_BALANCE_REQUEST_START,
  ACCOUNT_BALANCE_REQUEST_STOP,
  ACCOUNT_UPDATE,
  ACCOUNT_UPDATE_TRANSACTIONS,
  ACCOUNT_EMAIL_VERIFY,
  ACCOUNT_EMAIL_VERIFY_RESEND,
  ACCOUNT_VERIFY_TERMS_CONFIRM,
  ACCOUNT_UPDATE_USER_INFO,
  ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD,
  ACCOUNT_VERIFY_DOCUMENT_UPLOAD,
  ACCOUNT_VERIFY_SET_STAGE,
  accountToggleDashboard,
  accountBalanceRequestSuccess,
  accountBalanceWithdrawRequested,
  accountBalaceRequestStart,
  accountBalanceRequestStop,
  accountEmailVerify,
  accountUpdate,
  accountUpdateTransactions,
  accountEmailVerifyResend,
  accountVerifyTermsConfirm,
  accountUpdateUserInfo,
  accountVerifySkipDocumentUpload,
  accountVerifyDocumentUpload,
  accountVerifySetStage,
} from './account'

// combine all reducers
const modulesReducer: Reducer = combineReducers({
  auth: authReducer,
  modals: modalsReducer,
  tokens: tokensReducer,
  account: accountReducer,
  form: formReducer,
})

type State = {
  +modals: ModalState,
  +auth: AuthState,
  +tokens: TokenState,
  +account: AccountState,
}

export type {
  PopupNames,
  VerificationStatus,
  VerificationStage,
  State,
}

export {
  modulesReducer,
}
