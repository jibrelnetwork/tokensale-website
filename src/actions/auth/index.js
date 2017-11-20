import * as register from './register'
import * as verify from './verify'
import * as email from './email'
import * as AUTH from '../../constants/auth'

export { email, verify, register }

export const login = (mail, password) => ({
  type: AUTH.LOGIN,
  payload: { email: mail, password },
})

export const logout = () => ({
  type: AUTH.LOGOUT,
})

export const setToken = (token) => ({
  type: AUTH.SET_TOKEN,
  payload: { token },
})
