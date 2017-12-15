import * as AUTH from '../../constants/auth'

export const login = (email, password, captcha) => ({
  type: AUTH.LOGIN,
  payload: { email, password, captcha },
})

export const logout = () => ({
  type: AUTH.LOGOUT,
})

export const setToken = (token) => ({
  type: AUTH.SET_TOKEN,
  payload: { token },
})

export const showSupportLink = (isShow = true) => ({
  type: AUTH.SHOW_SUPPORT_LINK,
  payload: { isShow },
})
