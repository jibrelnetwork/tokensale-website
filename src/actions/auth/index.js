import * as register from './register'
import * as AUTH from '../../constants/auth'

export { register }

export const setToken = (token) => ({
  type: AUTH.SET_TOKEN,
  payload: { token },
})

export const resetToken = () => ({
  type: AUTH.RESET_TOKEN,
})

export const login = (email, password) => ({
  type: AUTH.LOGIN,
  payload: { email, password },
})

export const logout = () => ({
  type: AUTH.LOGOUT,
})
