import * as PASSWORD from '../../constants/account/password'

export const set = (password, newPassword) => ({
  type: PASSWORD.SET,
  payload: { password, newPassword },
})
