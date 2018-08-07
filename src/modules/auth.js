// @flow

export const AUTH_VERIFY = '@auth/email/Verify'
export const AUTH_RESEND = '@auth/email/Resend'

export const AUTH_RESET = '@auth/password/Reset'
export const AUTH_CHANGE = '@auth/password/Change'

export const AUTH_STATUS_REQUEST = '@auth/Status request'
export const AUTH_STATUS_REQUEST_CANCEL = '@auth/Status request cancel'

export const AUTH_SKIP_DOCUMENT = '@auth/verify/Skip document'
export const AUTH_UPLOAD_DOCUMENT = '@auth/verify/Upload document'
export const AUTH_UPDATE_USER_INFO = '@auth/verify/Update user info'

export type VerificationStatus = void | "Preliminarily Approved" | "Pending" | "Approved" | "Declined"

export type VerificationStage = "terms" | "user-info" | "document" | "loader"

/**
 * AUTH_LOGIN
 */
export const AUTH_LOGIN = '@auth/Login'

export type authLoginType = {
  type: '@auth/Login',
  payload: {
    email: string,
    password: string,
    captcha: string
  }
}

export const authLogin = (email: string, password: string, captcha: string): authLoginType => ({
  type: AUTH_LOGIN,
  payload: {
    email,
    password,
    captcha,
  },
})

/**
 * AUTH_LOGOUT
 */
export const AUTH_LOGOUT = '@auth/Logout'

declare type authLogoutType = {
  type: '@auth/Logout'
}

export const authLogout = (): authLogoutType => ({
  type: AUTH_LOGOUT,
})

/**
 * AUTH_SET_TOKEN
 */
export const AUTH_SET_TOKEN = '@auth/Set auth token'

declare type authSetTokenType = {
  type: '@auth/Set auth token',
  payload: {
    token: string
  }
}

export const authSetToken = (token: string): authSetTokenType => ({
  type: AUTH_SET_TOKEN,
  payload: { token },
})

/**
 * AUTH_SHOW_SUPPORT_LINK
 */
export const AUTH_SHOW_SUPPORT_LINK = '@auth/Show support link'

declare type authShowSupportLinkType = {
  type: '@auth/Show support link',
  payload: {
    isShow: boolean
  }
}

export const authShowSupportLink = (isShow: boolean = true): authShowSupportLinkType => ({
  type: AUTH_SHOW_SUPPORT_LINK,
  payload: {
    isShow,
  },
})

/**
 * AUTH_STATUS_REQUEST_SUCCESS
 */
export const AUTH_STATUS_REQUEST_SUCCESS = '@auth/Status request success'
export const AUTH_SET_STATUS = AUTH_STATUS_REQUEST_SUCCESS

export type authSetVerifyStatusType = {
  type: '@auth/Status request success',
  payload: {
    status: VerificationStatus
  }
}

export const authSetVerifyStatus = (status: VerificationStatus): authSetVerifyStatusType => ({
  type: AUTH_STATUS_REQUEST_SUCCESS,
  payload: { status },
})

/**
 * AUTH_SET_STAGE
 */
export const AUTH_SET_STAGE = '@auth/verify/Set stage'

export type authSetStageType = {
  type: '@auth/verify/Set stage',
  payload: {
    stage: VerificationStage
  }
}

export const authSetVerifyStage = (stage: VerificationStage) => ({
  type: AUTH_SET_STAGE,
  payload: { stage },
})

/**
 * AUTH_CREATE_ACCOUNT
 */
export const AUTH_CREATE_ACCOUNT = '@auth/register/Create account'

export type authCreateAccountType = {
  type: '@auth/register/Create account',
  payload: {
    email: string,
    password: string,
    passwordConfirm: string,
    captcha: string,
  }
}

export const authCreateAccount = (email: string, password: string,
  passwordConfirm: string, captcha: string): authCreateAccountType => ({
  type: AUTH_CREATE_ACCOUNT,
  payload: { email, password, passwordConfirm, captcha },
})

/**
 * AUTH_CONFIRM_TERMS
 */
export const AUTH_CONFIRM_TERMS = '@auth/AUTH_CONFIRM_TERMS'

export type authConfirmTermsType = {
  type: '@auth/AUTH_CONFIRM_TERMS',
}

export const authConfirmTerms = (): authConfirmTermsType => ({
  type: AUTH_CONFIRM_TERMS,
})

/**
 * Reducer
 */
export type AuthState = {
  token: ?string,
  verifyStatus: VerificationStatus,
  verifyStage: VerificationStage,
  isSupportLinkShown: boolean
}

const defaultState: AuthState = {
  token: undefined,
  verifyStatus: undefined,
  verifyStage: 'terms',
  isSupportLinkShown: false,
}

type authActionType = authLoginType |
  authLogoutType |
  authSetTokenType |
  authShowSupportLinkType |
  authCreateAccountType |
  authSetVerifyStatusType |
  authSetStageType

export const authReducer = (state: AuthState = defaultState, action: authActionType): AuthState => {
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
        verifyStatus: undefined,
      }
    }

    case AUTH_STATUS_REQUEST_SUCCESS: {
      const { status }: { status: VerificationStatus } = action.payload
      return {
        ...state,
        verifyStatus: status,
      }
    }

    case AUTH_SHOW_SUPPORT_LINK: {
      const { isShow } = action.payload
      return {
        ...state,
        isSupportLinkShown: isShow,
      }
    }

    case AUTH_SET_STAGE: {
      const { stage } = action.payload
      return {
        ...state,
        verifyStage: stage,
      }
    }

    default: return state
  }
}

