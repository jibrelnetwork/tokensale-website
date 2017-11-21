import * as TRANSACTIONS from '../../constants/account/transactions'

export const request = () => ({
  type: TRANSACTIONS.REQUEST,
})

export const requestSuccess = (transactions) => ({
  type: TRANSACTIONS.REQUEST_SUCCESS,
  payload: { transactions },
})
