import * as AUTH from '../../constants/auth'

export const login = (email, password) => ({
  type: AUTH.LOGIN,
  payload: { email, password },
})

export const logout = () => ({
  type: AUTH.LOGOUT,
})

export const setToken = (token) => ({
  type: AUTH.SET_TOKEN,
  payload: { token },
})
