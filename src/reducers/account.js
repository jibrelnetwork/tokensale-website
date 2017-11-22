import { set, compose } from 'lodash/fp'
import * as ACCOUNT from '../constants/account'

const defaultState = {
  balance: 0,
  btcAddress: undefined,
  ethAddress: undefined,
  transactions: [],
}

const accountReducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACCOUNT.BALANCE.REQUEST_SUCCESS: {
      const { balance } = action.payload
      return set('balance', balance, state)
    }

    case ACCOUNT.ADDRESSES.REQUEST_SUCCESS: {
      const { ethAddress, btcAddress } = action.payload
      return compose(
        set('ethAddress', ethAddress),
        set('btcAddress', btcAddress),
      )(state)
    }

    case ACCOUNT.TRANSACTIONS.REQUEST_SUCCESS: {
      const { transactions } = action.payload
      return set('transactions', transactions, state)
    }

    default: return state
  }
}

export default accountReducer
