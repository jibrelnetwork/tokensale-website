import { set, compose } from 'lodash/fp'
import * as ACCOUNT from '../constants/account'

const defaultState = {
  modals: {
    setAddress: 'close',
    setPassword: 'close',
    withdraw: 'close',
    kycStatus: 'close',
  },
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
      const { isAddressChangeRequested } = action.payload
      return set('isAddressChangeRequested', isAddressChangeRequested, state)
    }

    case ACCOUNT.ADDRESS.SET: {
      const { address } = action.payload
      return set('address', address, state)
    }

    case ACCOUNT.ADDRESSES.REQUEST_SUCCESS: {
      const { ethAddress, btcAddress } = action.payload
      return compose(
        set('ethAddress', ethAddress),
        set('btcAddress', btcAddress),
      )(state)
    }

    case ACCOUNT.BALANCE.REQUEST_SUCCESS: {
      const { balance } = action.payload
      return set('balance', balance, state)
    }

    case ACCOUNT.BALANCE.WITHDRAW_REQUESTED: {
      const { isWithdrawRequested } = action.payload
      return set('isWithdrawRequested', isWithdrawRequested, state)
    }

    case ACCOUNT.DASHBOARD.TOGGLE: {
      return set(['dashboard', 'isOpen'], !state.dashboard.isOpen, state)
    }

    case ACCOUNT.DASHBOARD.SET_DATA: {
      const { accountData } = action.payload
      return set(['dashboard', 'accountData'], accountData, state)
    }

    case ACCOUNT.MODALS.SET_STATE: {
      const { modalName, modalState } = action.payload
      return set(['modals', modalName], modalState, state)
    }

    case ACCOUNT.TRANSACTIONS.REQUEST_SUCCESS: {
      const { transactions } = action.payload
      return set('transactions', transactions, state)
    }

    case ACCOUNT.PASSWORD.OPEN_CHANGE_CONFIRM: {
      return compose(
        set(['passwordChangeConfirmModal', 'isOpen'], true),
        set(['passwordChangeConfirmModal', 'status'], 'confirm'),
      )(state)
    }

    case ACCOUNT.PASSWORD.CLOSE_CHANGE_CONFIRM: {
      return set(['passwordChangeConfirmModal', 'isOpen'], false, state)
    }

    case ACCOUNT.PASSWORD.CHANGE_CONFIRM_REQUEST: {
      return set(['passwordChangeConfirmModal', 'status'], 'request', state)
    }

    case ACCOUNT.PASSWORD.CHANGE_CONFIRM_SUCCESS: {
      return set(['passwordChangeConfirmModal', 'status'], 'success', state)
    }

    case ACCOUNT.PASSWORD.CHANGE_CONFIRM_FAILURE: {
      const { error } = action.payload
      return compose(
        set(['passwordChangeConfirmModal', 'status'], 'failure'),
        set(['passwordChangeConfirmModal', 'message'], error)
      )(state)
    }

    default: return state
  }
}

export default accountReducer
