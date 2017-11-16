import * as REGISTER from '../../constants/auth/register'

export const createAccount = (email, password, passwordConfirm, captcha) => ({
  type: REGISTER.CREATE_ACCOUNT,
  payload: { email, password, passwordConfirm, captcha },
})
