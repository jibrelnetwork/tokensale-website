import * as PASSWORD from '../../constants/auth/password'

export const reset = (email) => ({
  type: PASSWORD.RESET,
  payload: { email },
})

export const change = (uid, token, newPassword, newPasswordConfirm) => ({
  type: PASSWORD.CHANGE,
  payload: { uid, token, newPassword, newPasswordConfirm },
})

