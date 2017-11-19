import { set } from 'lodash/fp'
import * as TRANSACTIONS from '../constants/account/transactions'

const defaultState = {
  balance: 20000,
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

    case TRANSACTIONS.DOWNLOAD_SUCCESS: {
      const { transactions } = action.payload
      return set('transactions', transactions, state)
    }

    default: return state
  }
}

export default accountReducer
