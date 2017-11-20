import * as EMAIL from '../../constants/auth/email'

export const verify = (key) => ({
  type: EMAIL.VERIFY,
  payload: { key },
})
