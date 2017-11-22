import { set, compose } from 'lodash/fp'
import * as ACCOUNT from '../constants/account'

const defaultState = {
  address: undefined,
  balance: 0,
  modals: {
    setAddress: 'close',
    setPassword: 'close',
    withdraw: 'close',
  },
  btcAddress: undefined,
  ethAddress: undefined,
  transactions: [],
}

const accountReducer = (state = defaultState, action) => {
  switch (action.type) {

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

    case ACCOUNT.MODALS.SET_STATE: {
      const { modalName, modalState } = action.payload
      return set(['modals', modalName], modalState, state)
    }

    case ACCOUNT.TRANSACTIONS.REQUEST_SUCCESS: {
      const { transactions } = action.payload
      return set('transactions', transactions, state)
    }

    default: return state
  }
}

export default accountReducer
