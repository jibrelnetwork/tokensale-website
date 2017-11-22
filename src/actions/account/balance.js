import * as BALANCE from '../../constants/account/balance'

export const request = () => ({
  type: BALANCE.REQUEST,
})

export const requestSuccess = (balance) => ({
  type: BALANCE.REQUEST_SUCCESS,
  payload: { balance },
})

export const withdraw = (address, amount) => ({
  type: BALANCE.WITHDRAW,
  payload: { address, amount },
})
