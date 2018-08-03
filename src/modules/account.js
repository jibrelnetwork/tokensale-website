// @flow

/**
 * ACCOUNT_DASHBOARD_TOGGLE
 */
export const ACCOUNT_DASHBOARD_TOGGLE = '@account/ACCOUNT_DASHBOARD_TOGGLE'

export type accountToggleDashboardType = {
  type: '@account/ACCOUNT_DASHBOARD_TOGGLE'
}

export const accountToggleDashboard = () => ({
  type: ACCOUNT_DASHBOARD_TOGGLE,
})

/**
 * Reducer
 */

export type AccountState = {
  firstName: string,
  lastName: string,
  email: string,
  dashboardIsOpen: boolean,
  transactions: Array<any>,
  balance: number,
  btcAddress: ?string,
  ethAddress: ?string,
  address: ?string,
  isAddressChangeRequested: boolean,
  isWithdrawRequested: boolean,
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
}

type accountActionType = accountToggleDashboardType

export const accountReducer = (state: AccountState = defaultState, action: accountActionType): AccountState => {
  switch (action.type) {

    case ACCOUNT_DASHBOARD_TOGGLE: {
      return {
        ...state,
        dashboardIsOpen: !state.dashboardIsOpen,
      }
    }

    default:
      return state
  }
}
