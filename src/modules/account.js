// @flow

import { AUTH_LOGOUT } from './auth'
import type { authLogoutType } from './auth'

/**
 * ACCOUNT_BALANCE_REQUEST_SUCCESS
 */
export const ACCOUNT_BALANCE_REQUEST_SUCCESS = '@account/ACCOUNT_BALANCE_REQUEST_SUCCESS'

export type accountBalanceRequestSuccessType = {
  type: '@account/ACCOUNT_BALANCE_REQUEST_SUCCESS',
  payload: {
    balance: number
  }
}

export function accountBalanceRequestSuccess(balance: number): accountBalanceRequestSuccessType {
  return {
    type: ACCOUNT_BALANCE_REQUEST_SUCCESS,
    payload: {
      balance,
    },
  }
}

/**
 * ACCOUNT_UPDATE
 */
export const ACCOUNT_UPDATE = '@account/ACCOUNT_UPDATE'

export type accountUpdatePayloadType = {
  firstName?: string,
  lastName?: string,
  email?: string,
  balance?: number,
  btcAddress?: string,
  ethAddress?: string,
  address?: string,
  isAddressChangeRequested?: boolean,
  isDocumentUploadSkipped?: boolean,
  verifyStatus?: VerificationStatus,
  verifyStage?: VerificationStage
}

export type accountUpdateType = {
  type: '@account/ACCOUNT_UPDATE',
  payload: accountUpdatePayloadType,
}

export function accountUpdate(payload: accountUpdatePayloadType): accountUpdateType {
  return {
    type: ACCOUNT_UPDATE,
    payload,
  }
}

/**
 * ACCOUNT_UPDATE_TRANSACTIONS
 */
export const ACCOUNT_UPDATE_TRANSACTIONS = '@account/ACCOUNT_UPDATE_TRANSACTIONS'

export type accountUpdateTransactionsType = {
  type: '@account/ACCOUNT_UPDATE_TRANSACTIONS',
  payload: {
    transactions: Array<any>
  }
}

export function accountUpdateTransactions(transactions: Array<any>) {
  return {
    type: ACCOUNT_UPDATE_TRANSACTIONS,
    payload: {
      transactions,
    },
  }
}

/**
 * ACCOUNT_EMAIL_VERIFY
 */
export const ACCOUNT_EMAIL_VERIFY = '@account/ACCOUNT_EMAIL_VERIFY'

export type accountEmailVerifyType = {
  type: '@account/ACCOUNT_EMAIL_VERIFY',
  payload: {
    key: string,
  }
}

export function accountEmailVerify(key: string): accountEmailVerifyType {
  return {
    type: ACCOUNT_EMAIL_VERIFY,
    payload: {
      key,
    },
  }
}

/**
 * ACCOUNT_EMAIL_VERIFY_RESEND
 */
export const ACCOUNT_EMAIL_VERIFY_RESEND = '@account/ACCOUNT_EMAIL_VERIFY_RESEND'

export type accountEmailVerifyResendType = {
  type: '@account/ACCOUNT_EMAIL_VERIFY_RESEND'
}

export function accountEmailVerifyResend(): accountEmailVerifyResendType {
  return {
    type: ACCOUNT_EMAIL_VERIFY_RESEND,
  }
}

/**
 * ACCOUNT_VERIFY_TERMS_CONFIRM
 */
export const ACCOUNT_VERIFY_TERMS_CONFIRM = '@account/ACCOUNT_VERIFY_TERMS'

export type accountVerifyTermsConfirmType = {
  type: '@account/ACCOUNT_VERIFY_TERMS'
}

export function accountVerifyTermsConfirm(): accountVerifyTermsConfirmType {
  return {
    type: ACCOUNT_VERIFY_TERMS_CONFIRM,
  }
}

/**
 * ACCOUNT_UPDATE_USER_INFO
 */
export const ACCOUNT_UPDATE_USER_INFO = '@account/ACCOUNT_UPDATE_USER_INFO'

export type accountUpdateUserInfoType = {
  type: '@account/ACCOUNT_UPDATE_USER_INFO',
  payload: {
    firstName: string,
    lastName: string,
    birthday: string,
    residency: string,
    citizenship: string,
  }
}

export function accountUpdateUserInfo(firstName: string, lastName: string, birthday: string,
  residency: string, citizenship: string): accountUpdateUserInfoType {
  return {
    type: ACCOUNT_UPDATE_USER_INFO,
    payload: { firstName, lastName, birthday, residency, citizenship },
  }
}

/**
 * ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD
 */
export const ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD = '@account/ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD'

export type accountVerifySkipDocumentUploadType = {
  type: '@account/ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD',
}

export function accountVerifySkipDocumentUpload(): accountVerifySkipDocumentUploadType {
  return {
    type: ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD,
  }
}

/**
 * ACCOUNT_VERIFY_DOCUMENT_UPLOAD
 */
export const ACCOUNT_VERIFY_DOCUMENT_UPLOAD = '@account/ACCOUNT_VERIFY_DOCUMENT_UPLOAD'

export type accountVerifyDocumentUploadType = {
  type: '@account/ACCOUNT_VERIFY_DOCUMENT_UPLOAD',
  payload: {
    document: Object
  }
}

export function accountVerifyDocumentUpload(documentFile: Object): accountVerifyDocumentUploadType {
  return {
    type: ACCOUNT_VERIFY_DOCUMENT_UPLOAD,
    payload: {
      document: documentFile,
    },
  }
}

/**
 * ACCOUNT_VERIFY_SET_STAGE
 */
export const ACCOUNT_VERIFY_SET_STAGE = '@account/ACCOUNT_VERIFY_SET_STAGE'

export type accountVerifySetStageType = {
  type: '@account/ACCOUNT_VERIFY_SET_STAGE',
  payload: {
    stage: VerificationStage
  }
}

export function accountVerifySetStage(stage: VerificationStage) {
  return {
    type: ACCOUNT_VERIFY_SET_STAGE,
    payload: { stage },
  }
}

/**
 * ACCOUNT_WITHDRAW_REQUEST
 */
export const ACCOUNT_WITHDRAW_REQUEST = '@account/ACCOUNT_WITHDRAW_REQUEST'

export type requestWithdrawType = {
  type: '@account/ACCOUNT_WITHDRAW_REQUEST'
}

export function accountWithdrawRequest(): requestWithdrawType {
  return {
    type: ACCOUNT_WITHDRAW_REQUEST,
  }
}

/**
 * ACCOUNT_WITHDRAW_SET_REQUESTED
 */
export const ACCOUNT_WITHDRAW_SET_REQUESTED = '@account/ACCOUNT_WITHDRAW_SET_REQUESTED'

export type accountWithdrawSetRequestedType = {
  type: '@account/ACCOUNT_WITHDRAW_SET_REQUESTED',
  payload: {
    isWithdrawRequested: boolean
  }
}

export function accountWithdrawSetRequested(isWithdrawRequested: boolean): accountWithdrawSetRequestedType {
  return {
    type: ACCOUNT_WITHDRAW_SET_REQUESTED,
    payload: {
      isWithdrawRequested,
    },
  }
}

/**
 * ACCOUNT_WITHDRAW_CONFIRM
 */
export const ACCOUNT_WITHDRAW_CONFIRM = '@account/ACCOUNT_WITHDRAW_CONFIRM'

export type accountWithdrawConfirmType = {
  type: '@account/ACCOUNT_WITHDRAW_CONFIRM',
  payload: {
    token: string,
    operationId: string,
  }
}

export function accountWithdrawConfirm(token: string, operationId: string): accountWithdrawConfirmType {
  return {
    type: ACCOUNT_WITHDRAW_CONFIRM,
    payload: {
      token,
      operationId,
    },
  }
}

/**
 * ACCOUNT_ADDRESS_CHANGE_REQUEST
 */
export const ACCOUNT_ADDRESS_CHANGE_REQUEST = '@account/ACCOUNT_ADDRESS_CHANGE_REQUEST'

export type accountAddressChangeRequestType = {
  type: '@account/ACCOUNT_ADDRESS_CHANGE_REQUEST',
  payload: {
    address: string,
  }
}

export function accountAddressChangeRequest(newAddress: string): accountAddressChangeRequestType {
  return {
    type: ACCOUNT_ADDRESS_CHANGE_REQUEST,
    payload: {
      address: newAddress,
    },
  }
}

/**
 * ACCOUNT_ADDRESS_CHANGE_REQUESTED
 */
export const ACCOUNT_ADDRESS_CHANGE_REQUESTED = '@account/ACCOUNT_ADDRESS_CHANGE_REQUESTED'

export type accountAddressChangeRequestedType = {
  type: '@account/ACCOUNT_ADDRESS_CHANGE_REQUESTED',
  payload: {
    isAddressChangeRequested: boolean,
  }
}

export function accountAddressChangeRequested(isRequested: boolean): accountAddressChangeRequestedType {
  return {
    type: ACCOUNT_ADDRESS_CHANGE_REQUESTED,
    payload: {
      isAddressChangeRequested: isRequested,
    },
  }
}

/**
 * ACCOUNT_ADDRESS_CHANGE_CONFIRM
 */
export const ACCOUNT_ADDRESS_CHANGE_CONFIRM = '@account/ACCOUNT_ADDRESS_CHANGE_CONFIRM'

export type accountAddressChangeConfirmType = {
  type: '@account/ACCOUNT_ADDRESS_CHANGE_CONFIRM',
  payload: {
    token: string,
    operationId: string,
  }
}

export function accountAddressChangeConfirm(operationId: string, token: string): accountAddressChangeConfirmType {
  return {
    type: ACCOUNT_ADDRESS_CHANGE_CONFIRM,
    payload: {
      operationId,
      token,
    },
  }
}

/**
 * ACCOUNT_ADDRESS_UPDATED
 */
export const ACCOUNT_ADDRESS_UPDATED = '@account/ACCOUNT_ADDRESS_UPDATED'

export type accountAddressUpdatedType = {
  type: '@account/ACCOUNT_ADDRESS_UPDATED',
  payload: {
    address: string,
  }
}

export function accountAddressUpdated(address: string): accountAddressUpdatedType {
  return {
    type: ACCOUNT_ADDRESS_UPDATED,
    payload: {
      address,
    },
  }
}

/**
 * Reducer
 */

export type AccountState = {
  +firstName: string,
  +lastName: string,
  +email: string,
  +transactions: Array<any>,
  +balance: number,
  +btcAddress: ?string,
  +ethAddress: ?string,
  +address: ?string,
  +isAddressChangeRequested: boolean,
  +isWithdrawRequested: boolean,

  +isDocumentUploadSkipped: boolean,
  +isEmailConfirmed: boolean,
  +verifyStatus: VerificationStatus,
  +verifyStage: VerificationStage,

  +accountFetched: boolean,
  +transactionsFetched: boolean,
}

const defaultState: AccountState = {
  firstName: '',
  lastName: '',
  email: '',
  transactions: [],
  balance: 0,
  btcAddress: undefined,
  ethAddress: undefined,
  address: undefined,
  isAddressChangeRequested: false,
  isWithdrawRequested: false,
  isEmailConfirmed: false,
  verifyStatus: undefined,
  verifyStage: 'terms',
  isDocumentUploadSkipped: false,
  accountFetched: false,
  transactionsFetched: false,
}

type accountActionType = accountBalanceRequestSuccessType |
  accountUpdateType |
  accountEmailVerifyType |
  accountEmailVerifyResendType |
  accountVerifyTermsConfirmType |
  accountUpdateUserInfoType |
  accountVerifySkipDocumentUploadType |
  accountVerifySetStageType |
  accountUpdateTransactionsType |
  requestWithdrawType |
  accountWithdrawSetRequestedType |
  accountWithdrawConfirmType |
  accountAddressChangeRequestType |
  accountAddressChangeRequestedType |
  accountAddressUpdatedType |
  authLogoutType

export function accountReducer(state: AccountState = defaultState, action: accountActionType): AccountState {
  switch (action.type) {

    case ACCOUNT_BALANCE_REQUEST_SUCCESS: {
      const { balance } = action.payload
      return {
        ...state,
        balance,
      }
    }

    case ACCOUNT_WITHDRAW_SET_REQUESTED: {
      const { isWithdrawRequested } = action.payload
      return {
        ...state,
        isWithdrawRequested,
      }
    }

    case ACCOUNT_UPDATE: {
      return {
        ...state,
        ...action.payload,
        accountFetched: true,
      }
    }

    case ACCOUNT_UPDATE_TRANSACTIONS: {
      const { transactions } = action.payload
      return {
        ...state,
        transactions,
        transactionsFetched: true,
      }
    }

    case ACCOUNT_VERIFY_SET_STAGE: {
      const { stage } = action.payload
      return {
        ...state,
        verifyStage: stage,
      }
    }

    case ACCOUNT_ADDRESS_CHANGE_REQUESTED: {
      const { isAddressChangeRequested } = action.payload
      return {
        ...state,
        isAddressChangeRequested,
      }
    }

    case ACCOUNT_ADDRESS_UPDATED: {
      const { address } = action.payload
      return {
        ...state,
        address,
      }
    }

    case AUTH_LOGOUT: {
      return {
        ...defaultState,
      }
    }

    default:
      return state
  }
}
