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
}

type accountActionType = accountToggleDashboardType |
  accountBalanceRequestSuccessType |
  accountBalanceWithdrawRequestedType |
  accountBalaceRequestStartType |
  accountBalanceRequestStop |
  accountUpdateType

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

    case AUTH_LOGOUT: {
      return defaultState
    }

    default:
      return state
  }
}
