import * as TRANSACTIONS from '../../constants/account/transactions'

export const download = () => ({
  type: TRANSACTIONS.DOWNLOAD,
})

export const downloadSuccess = (transactions) => ({
  type: TRANSACTIONS.DOWNLOAD_SUCCESS,
  payload: { transactions },
})
