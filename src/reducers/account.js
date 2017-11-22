import { set } from 'lodash/fp'
import * as ACCOUNT from '../constants/account'

const defaultState = {
  address: undefined,
  balance: 0,
  modals: {
    setAddress: 'close',
    setPassword: 'close',
    withdraw: 'close',
  },
  transactions: [{
    jnt: 10000,
    type: 'incoming',
    date: '13:30 10/22/2017',
    hash: '0x00360d2b7d240ec0643b6d819ba81a09e40e5bc1',
    status: 'complete',
    amount: '10 BTC / 72 000 USD',
  }, {
    jnt: 10000,
    type: 'outgoing',
    date: '13:30 10/22/2017',
    hash: '0x00360d2b7d240ec0643b6d819ba81a09e40e5bc2',
    status: 'complete',
    amount: '10 BTC / 72 000 USD',
  }, {
    jnt: 10000,
    type: 'outgoing',
    date: '13:30 10/22/2017',
    hash: '0x00360d2b7d240ec0643b6d819ba81a09e40e5bc3',
    status: 'waiting',
    amount: '10 BTC / 72 000 USD',
  }, {
    jnt: 10000,
    type: 'incoming',
    date: '13:30 10/22/2017',
    hash: '0x00360d2b7d240ec0643b6d819ba81a09e40e5bc4',
    status: 'waiting',
    amount: '10 BTC / 72 000 USD',
  }],
}

const accountReducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACCOUNT.ADDRESS.SET: {
      const { address } = action.payload
      return set('address', address, state)
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
