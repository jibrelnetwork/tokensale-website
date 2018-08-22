// @flow

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import type { Reducer } from 'redux'

import { authReducer } from './auth'
import { icoReducer } from './ico'
import { modalsReducer } from './modals'
import { accountReducer } from './account'
import { appearanceReducer } from './appearance'

import type { ModalState } from './modals'
import type { AuthState } from './auth'
import type { IcoState } from './ico'
import type { AccountState } from './account'
import type { AppearanceState } from './appearance'

export {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SET_TOKEN,
  AUTH_SHOW_SUPPORT_LINK,
  AUTH_CREATE_ACCOUNT,
  AUTH_RESET_PASSWORD,
  AUTH_RESET_PASSWORD_CHANGE,
  AUTH_CHANGE_CURRENT_PASSWORD,
  authLogin,
  authLogout,
  authSetToken,
  authShowSupportLink,
  authCreateAccount,
  authResetPassword,
  authResetPasswordChange,
  authChangeCurrentPassword,
} from './auth'

export {
  RAISED_REQUEST,
  RAISED_REQUEST_CANCEL,
  RAISED_REQUEST_SUCCESS,
  raisedRequest,
  raisedRequestCancel,
  raisedRequestSuccess,
} from './ico'

export {
  MODALS_SHOW_MODAL,
  MODALS_CLOSE_ALL,
  showModal,
  closeModals,
  modalSetState,
} from './modals'

export {
  ACCOUNT_BALANCE_REQUEST_SUCCESS,
  ACCOUNT_UPDATE,
  ACCOUNT_UPDATE_TRANSACTIONS,
  ACCOUNT_EMAIL_VERIFY,
  ACCOUNT_EMAIL_VERIFY_RESEND,
  ACCOUNT_VERIFY_TERMS_CONFIRM,
  ACCOUNT_UPDATE_USER_INFO,
  ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD,
  ACCOUNT_VERIFY_DOCUMENT_UPLOAD,
  ACCOUNT_VERIFY_SET_STAGE,
  ACCOUNT_WITHDRAW_REQUEST,
  ACCOUNT_WITHDRAW_SET_REQUESTED,
  ACCOUNT_WITHDRAW_CONFIRM,
  ACCOUNT_ADDRESS_CHANGE_REQUEST,
  ACCOUNT_ADDRESS_CHANGE_REQUESTED,
  ACCOUNT_ADDRESS_CHANGE_CONFIRM,
  ACCOUNT_ADDRESS_UPDATED,
  accountBalanceRequestSuccess,
  accountEmailVerify,
  accountUpdate,
  accountUpdateTransactions,
  accountEmailVerifyResend,
  accountVerifyTermsConfirm,
  accountUpdateUserInfo,
  accountVerifySkipDocumentUpload,
  accountVerifyDocumentUpload,
  accountVerifySetStage,
  accountWithdrawRequest,
  accountWithdrawSetRequested,
  accountWithdrawConfirm,
  accountAddressChangeRequest,
  accountAddressChangeRequested,
  accountAddressChangeConfirm,
  accountAddressUpdated,
} from './account'

export {
  DASHBOARD_TOGGLE,
  toggleDashboard,
} from './appearance'

// combine all reducers
const modulesReducer: Reducer = combineReducers({
  auth: authReducer,
  modals: modalsReducer,
  ico: icoReducer,
  account: accountReducer,
  form: formReducer,
  appearance: appearanceReducer,
})

export type State = {
  +modals: ModalState,
  +auth: AuthState,
  +ico: IcoState,
  +account: AccountState,
  +appearance: AppearanceState,
}

export {
  modulesReducer,
}
