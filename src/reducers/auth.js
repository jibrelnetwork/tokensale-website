import { set, compose } from 'lodash/fp'
import * as AUTH from '../constants/auth'

const defaultState = {
  token: undefined,
  /**
   * Verification statuses, one of null, "Preliminarily Approved", "Pending", "Approved", "Declined"
   */
  verifyStatus: undefined,
  isSupportLinkShown: false,
}

const authReducer = (state = defaultState, action) => {
  switch (action.type) {

    case AUTH.SET_TOKEN: {
      const { token } = action.payload
      return set('token', token, state)
    }

    case AUTH.LOGOUT: {
      return compose(
        set('token', undefined),
        set('verifyStatus', undefined),
      )(state)
    }

    case AUTH.VERIFY.SET_STATUS: {
      const { status } = action.payload
      return set('verifyStatus', status, state)
    }

    case AUTH.SHOW_SUPPORT_LINK: {
      const { isShow } = action.payload
      return set('isSupportLinkShown', isShow, state)
    }

    default: return state
  }
}

export default authReducer
