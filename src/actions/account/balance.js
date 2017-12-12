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

export const withdrawConfirm = (operationId, token) => ({
  type: BALANCE.WITHDRAW_CONFIRM,
  payload: { token, operationId },
})

export const withdrawRequested = (isWithdrawRequested) => ({
  type: BALANCE.WITHDRAW_REQUESTED,
  payload: { isWithdrawRequested },
})
