import * as ADDRESS from '../../constants/account/address'

export const send = (address) => ({
  type: ADDRESS.SEND,
  payload: { address },
})

export const get = () => ({
  type: ADDRESS.GET,
})
