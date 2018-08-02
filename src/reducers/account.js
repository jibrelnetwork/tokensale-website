// @flow

import { assoc, assocPath, compose } from 'ramda'

import * as ACCOUNT from '../constants/account'

const defaultState = {
  dashboard: {
    accountData: {
      firstName: '...',
      lastName: '...',
      email: '...',
    },
    isOpen: false,
  },
  transactions: [],
  balance: 0,
  btcAddress: undefined,
  ethAddress: undefined,
  address: undefined,
  isAddressChangeRequested: false,
  isWithdrawRequested: false,
  passwordChangeConfirmModal: {
    isOpen: false,
    status: 'confirm',
    message: undefined,
  },
}

const accountReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACCOUNT.ADDRESS.CHANGE_REQUESTED: {
      const { isAddressChangeRequested }: { isAddressChangeRequested: boolean } = action.payload
      return {
        ...state,
        isAddressChangeRequested,
      }
    }

    case ACCOUNT.ADDRESS.SET: {
      const { address }: { address: string } = action.payload
      return {
        ...state,
        address,
      }
    }

    case ACCOUNT.ADDRESSES.REQUEST_SUCCESS: {
      const { ethAddress, btcAddress }: { ethAddress: ?string, btcAddress: ?string } = action.payload
      return {
        ...state,
        ethAddress,
        btcAddress,
      }
    }

    case ACCOUNT.BALANCE.REQUEST_SUCCESS: {
      const { balance }: { balance: number } = action.payload
      return {
        ...state,
        balance,
      }
    }

    case ACCOUNT.BALANCE.WITHDRAW_REQUESTED: {
      const { isWithdrawRequested }: { isWithdrawRequested: boolean } = action.payload
      return {
        ...state,
        isWithdrawRequested,
      }
    }

    case ACCOUNT.DASHBOARD.TOGGLE: {
      return assocPath(['dashboard', 'isOpen'], !state.dashboard.isOpen)(state)
    }

    case ACCOUNT.DASHBOARD.SET_DATA: {
      const { accountData }: { accountData: string } = action.payload
      return assocPath(['dashboard', 'accountData'], accountData)(state)
    }

    case ACCOUNT.TRANSACTIONS.REQUEST_SUCCESS: {
      const { transactions }: { transactions: Array<any> } = action.payload
      return assoc('transactions', transactions)(state)
    }

    case ACCOUNT.PASSWORD.OPEN_CHANGE_CONFIRM: {
      return compose(
        assocPath(['passwordChangeConfirmModal', 'isOpen'], true),
        assocPath(['passwordChangeConfirmModal', 'status'], 'confirm'),
      )(state)
    }

    case ACCOUNT.PASSWORD.CLOSE_CHANGE_CONFIRM: {
      return assocPath(['passwordChangeConfirmModal', 'isOpen'], false)(state)
    }

    case ACCOUNT.PASSWORD.CHANGE_CONFIRM_REQUEST: {
      return assocPath(['passwordChangeConfirmModal', 'status'], 'request')(state)
    }

    case ACCOUNT.PASSWORD.CHANGE_CONFIRM_SUCCESS: {
      return assocPath(['passwordChangeConfirmModal', 'status'], 'success')(state)
    }

    case ACCOUNT.PASSWORD.CHANGE_CONFIRM_FAILURE: {
      const { error }: { error: string } = action.payload
      return compose(
        assocPath(['passwordChangeConfirmModal', 'status'], 'failure'),
        assocPath(['passwordChangeConfirmModal', 'message'], error)
      )(state)
    }

    default:
      return state
  }
}

export default accountReducer
