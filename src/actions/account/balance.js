import * as BALANCE from '../../constants/account/balance'

export const request = () => ({
  type: BALANCE.REQUEST,
})

export const requestCancel = () => ({
  type: BALANCE.REQUEST_CANCEL,
})

export const requestSuccess = (balance) => ({
  type: BALANCE.REQUEST_SUCCESS,
  payload: { balance },
})

export const withdraw = () => ({
  type: BALANCE.WITHDRAW,
})
