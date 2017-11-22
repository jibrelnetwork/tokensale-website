import * as TOKENS from '../constants/tokens'

export const raisedRequest = () => ({
  type: TOKENS.RAISED_REQUEST,
})

export const raisedRequestCancel = () => ({
  type: TOKENS.RAISED_REQUEST_CANCEL,
})

export const raisedRequestSuccess = (amount) => ({
  type: TOKENS.RAISED_REQUEST_SUCCESS,
  payload: { amount },
})
