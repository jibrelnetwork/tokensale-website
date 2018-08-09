// @flow

import { AUTH_LOGOUT } from './auth'

export type VerificationStatus = void | "Preliminarily Approved" | "Pending" | "Approved" | "Declined"

export type VerificationStage = "terms" | "user-info" | "document" | "loader"

/**
 * ACCOUNT_BALANCE_WITHDRAW_REQUESTED
 */
export const ACCOUNT_BALANCE_WITHDRAW_REQUESTED = '@account/ACCOUNT_BALANCE_WITHDRAW_REQUESTED'

export type accountBalanceWithdrawRequestedType = {
  type: '@account/ACCOUNT_BALANCE_WITHDRAW_REQUESTED',
  payload: {
    isWithdrawRequested: boolean,
  }
}

export const accountBalanceWithdrawRequested = (isWithdrawRequested: boolean): accountBalanceWithdrawRequestedType => ({
  type: ACCOUNT_BALANCE_WITHDRAW_REQUESTED,
  payload: {
    isWithdrawRequested,
  },
})

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

export const accountBalanceRequestSuccess = (balance: number): accountBalanceRequestSuccessType => ({
  type: ACCOUNT_BALANCE_REQUEST_SUCCESS,
  payload: {
    balance,
  },
})

/**
 * ACCOUNT_BALANCE_REQUEST_START
 */
export const ACCOUNT_BALANCE_REQUEST_START = '@account/ACCOUNT_BALANCE_REQUEST_START'

export type accountBalaceRequestStartType = {
  type: '@account/ACCOUNT_BALANCE_REQUEST_START'
}

export const accountBalaceRequestStart = (): accountBalaceRequestStartType => ({
  type: ACCOUNT_BALANCE_REQUEST_START,
})

/**
 * ACCOUNT_BALANCE_REQUEST_STOP
 */
export const ACCOUNT_BALANCE_REQUEST_STOP = '@account/ACCOUNT_BALANCE_REQUEST_STOP'

export type accountBalanceRequestStopType = {
  type: '@account/ACCOUNT_BALANCE_REQUEST_STOP'
}

export const accountBalanceRequestStop = (): accountBalanceRequestStopType => ({
  type: ACCOUNT_BALANCE_REQUEST_STOP,
})

/**
 * ACCOUNT_DASHBOARD_TOGGLE
 */
export const ACCOUNT_DASHBOARD_TOGGLE = '@account/ACCOUNT_DASHBOARD_TOGGLE'

export type accountToggleDashboardType = {
  type: '@account/ACCOUNT_DASHBOARD_TOGGLE'
}

export const accountToggleDashboard = (): accountToggleDashboardType => ({
  type: ACCOUNT_DASHBOARD_TOGGLE,
})

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

export const accountUpdate = (payload: accountUpdatePayloadType): accountUpdateType => ({
  type: ACCOUNT_UPDATE,
  payload,
})

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

export const accountEmailVerify = (key: string): accountEmailVerifyType => ({
  type: ACCOUNT_EMAIL_VERIFY,
  payload: {
    key,
  },
})

/**
 * ACCOUNT_EMAIL_VERIFY_RESEND
 */
export const ACCOUNT_EMAIL_VERIFY_RESEND = '@account/ACCOUNT_EMAIL_VERIFY_RESEND'

export type accountEmailVerifyResendType = {
  type: '@account/ACCOUNT_EMAIL_VERIFY_RESEND'
}

export const accountEmailVerifyResend = (): accountEmailVerifyResendType => ({
  type: ACCOUNT_EMAIL_VERIFY_RESEND,
})

/**
 * ACCOUNT_VERIFY_TERMS
 */
export const ACCOUNT_VERIFY_TERMS_CONFIRM = '@account/ACCOUNT_VERIFY_TERMS'

export type accountVerifyTermsConfirmType = {
  type: '@account/ACCOUNT_VERIFY_TERMS'
}

export const accountVerifyTermsConfirm = (): accountVerifyTermsConfirmType => ({
  type: ACCOUNT_VERIFY_TERMS_CONFIRM,
})

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

export const accountUpdateUserInfo = (firstName: string, lastName: string, birthday: string,
  residency: string, citizenship: string): accountUpdateUserInfoType => ({
  type: ACCOUNT_UPDATE_USER_INFO,
  payload: { firstName, lastName, birthday, residency, citizenship },
})

/**
 * ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD
 */
export const ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD = '@account/ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD'

export type accountVerifySkipDocumentUploadType = {
  type: '@account/ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD',
}

export const accountVerifySkipDocumentUpload = (): accountVerifySkipDocumentUploadType => ({
  type: ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD,
})

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

export const accountVerifyDocumentUpload = (documentFile: Object): accountVerifyDocumentUploadType => ({
  type: ACCOUNT_VERIFY_DOCUMENT_UPLOAD,
  payload: {
    document: documentFile,
  },
})


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

export const accountVerifySetStage = (stage: VerificationStage) => ({
  type: ACCOUNT_VERIFY_SET_STAGE,
  payload: { stage },
})

/**
 * Reducer
 */

export type AccountState = {
  +firstName: string,
  +lastName: string,
  +email: string,
  +dashboardIsOpen: boolean,
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
}

const defaultState: AccountState = {
  firstName: '...',
  lastName: '...',
  email: '...',
  dashboardIsOpen: false,
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
}

type accountActionType = accountToggleDashboardType |
  accountBalanceRequestSuccessType |
  accountBalanceWithdrawRequestedType |
  accountBalaceRequestStartType |
  accountBalanceRequestStop |
  accountUpdateType |
  accountEmailVerifyType |
  accountEmailVerifyResendType |
  accountVerifyTermsConfirmType |
  accountUpdateUserInfoType |
  accountVerifySkipDocumentUploadType |
  accountVerifySetStageType

export const accountReducer = (state: AccountState = defaultState, action: accountActionType): AccountState => {
  switch (action.type) {

    case ACCOUNT_BALANCE_REQUEST_SUCCESS: {
      const { balance } = action.payload
      return {
        ...state,
        balance,
      }
    }

    case ACCOUNT_BALANCE_WITHDRAW_REQUESTED: {
      const { isWithdrawRequested } = action.payload
      return {
        ...state,
        isWithdrawRequested,
      }
    }

    case ACCOUNT_DASHBOARD_TOGGLE: {
      return {
        ...state,
        dashboardIsOpen: !state.dashboardIsOpen,
      }
    }

    case ACCOUNT_UPDATE: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case ACCOUNT_VERIFY_SET_STAGE: {
      const { stage } = action.payload
      return {
        ...state,
        verifyStage: stage,
      }
    }

    case AUTH_LOGOUT: {
      return defaultState
    }

    default:
      return state
  }
}
