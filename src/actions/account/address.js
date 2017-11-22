import * as ADDRESS from '../../constants/account/address'

export const set = (address) => ({
  type: ADDRESS.SET,
  payload: { address },
})
