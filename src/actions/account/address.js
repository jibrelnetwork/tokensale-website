import * as ADDRESS from '../../constants/account/address'

export const changeRequested = (isAddressChangeRequested) => ({
  type: ADDRESS.CHANGE_REQUESTED,
  payload: { isAddressChangeRequested },
})

export const get = () => ({
  type: ADDRESS.GET,
})

export const changeConfirm = (operationId, token) => ({
  type: ADDRESS.CHANGE_CONFIRM,
  payload: { token, operationId },
})

export const requestChange = (address) => ({
  type: ADDRESS.REQUEST_CHANGE,
  payload: { address },
})
