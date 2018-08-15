// @flow

/**
 * AUTH_LOGIN
 */
export const AUTH_LOGIN = '@auth/AUTH_LOGIN'

export type authLoginType = {
  type: '@auth/AUTH_LOGIN',
  payload: {
    email: string,
    password: string,
    captcha: string,
  },
}

export function authLogin(email: string, password: string, captcha: string): authLoginType {
  return {
    type: AUTH_LOGIN,
    payload: {
      email,
      password,
      captcha,
    },
  }
}

/**
 * AUTH_LOGOUT
 */
export const AUTH_LOGOUT = '@auth/AUTH_LOGOUT'

export type authLogoutType = {
  type: '@auth/AUTH_LOGOUT'
}

export function authLogout(): authLogoutType {
  return {
    type: AUTH_LOGOUT,
  }
}

/**
 * AUTH_SET_TOKEN
 */
export const AUTH_SET_TOKEN = '@auth/AUTH_SET_TOKEN'

export type authSetTokenType = {
  type: '@auth/AUTH_SET_TOKEN',
  payload: {
    token: string
  }
}

export function authSetToken(token: string): authSetTokenType {
  return {
    type: AUTH_SET_TOKEN,
    payload: { token },
  }
}

/**
 * AUTH_SHOW_SUPPORT_LINK
 */
export const AUTH_SHOW_SUPPORT_LINK = '@auth/AUTH_SHOW_SUPPORT_LINK'

export type authShowSupportLinkType = {
  type: '@auth/AUTH_SHOW_SUPPORT_LINK',
  payload: {
    isShow: boolean
  }
}

export function authShowSupportLink(isShow: boolean = true): authShowSupportLinkType {
  return {
    type: AUTH_SHOW_SUPPORT_LINK,
    payload: {
      isShow,
    },
  }
}

/**
 * AUTH_CREATE_ACCOUNT
 */
export const AUTH_CREATE_ACCOUNT = '@auth/AUTH_CREATE_ACCOUNT'

export type authCreateAccountType = {
  type: '@auth/AUTH_CREATE_ACCOUNT',
  payload: {
    email: string,
    password: string,
    passwordConfirm: string,
    captcha: string,
  }
}

export function authCreateAccount(email: string, password: string,
  passwordConfirm: string, captcha: string): authCreateAccountType {
  return {
    type: AUTH_CREATE_ACCOUNT,
    payload: { email, password, passwordConfirm, captcha },
  }
}

/**
 * AUTH_RESET_PASSWORD
 */
export const AUTH_RESET_PASSWORD = '@auth/AUTH_RESET_PASSWORD'

export type authResetPasswordType = {
  type: '@auth/AUTH_RESET_PASSWORD',
  payload: {
    email: string,
  }
}

export function authResetPassword(email: string): authResetPasswordType {
  return {
    type: AUTH_RESET_PASSWORD,
    payload: {
      email,
    },
  }
}

/**
 * AUTH_RESET_PASSWORD_CHANGE
 */
export const AUTH_RESET_PASSWORD_CHANGE = '@auth/AUTH_RESET_PASSWORD_CHANGE'

export type authResetPasswordChangeType = {
  type: '@auth/AUTH_RESET_PASSWORD_CHANGE',
  payload: {
    uid: string,
    token: string,
    newPassword: string,
    newPasswordConfirm: string
  }
}

export function authResetPasswordChange(uid: string, token: string,
  newPassword: string, newPasswordConfirm: string): authResetPasswordChangeType {
  return {
    type: AUTH_RESET_PASSWORD_CHANGE,
    payload: {
      uid,
      token,
      newPassword,
      newPasswordConfirm,
    },
  }
}

/**
 * Reducer
 */
export type AuthState = {
  token: ?string,
  isSupportLinkShown: boolean
}

const defaultState: AuthState = {
  token: undefined,
  isSupportLinkShown: false,
}

type authActionType = authLoginType |
  authLogoutType |
  authSetTokenType |
  authShowSupportLinkType |
  authCreateAccountType |
  authResetPasswordType |
  authResetPasswordChangeType

export function authReducer(state: AuthState = defaultState, action: authActionType): AuthState {
  switch (action.type) {

    case AUTH_SET_TOKEN: {
      const { token } = action.payload
      return {
        ...state,
        token,
      }
    }

    case AUTH_LOGOUT: {
      return {
        ...state,
        token: undefined,
      }
    }

    case AUTH_SHOW_SUPPORT_LINK: {
      const { isShow } = action.payload
      return {
        ...state,
        isSupportLinkShown: isShow,
      }
    }

    default: return state
  }
}
