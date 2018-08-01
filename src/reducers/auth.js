// @flow
/* ::
import type { AuthState, FSA, VerificationStatus } from 'types'
*/

import * as AUTH from '../constants/auth'

const defaultState: AuthState = {
  token: undefined,
  /**
   * Verification statuses, one of null, "Preliminarily Approved", "Pending", "Approved", "Declined"
   */
  verifyStatus: undefined,
  isSupportLinkShown: false,
}

const authReducer = (state: AuthState = defaultState, action: FSA): AuthState => {
  switch (action.type) {

    case AUTH.SET_TOKEN: {
      const { token }: { token: string } = action.payload
      return {
        ...state,
        token,
      }
    }

    case AUTH.LOGOUT: {
      return {
        ...state,
        token: undefined,
        verifyStatus: undefined,
      }
    }

    case AUTH.VERIFY.SET_STATUS: {
      const { status }: { status: VerificationStatus } = action.payload
      return {
        ...state,
        verifyStatus: status,
      }
    }

    case AUTH.SHOW_SUPPORT_LINK: {
      const { isShow }: { isShow: boolean } = action.payload
      return {
        ...state,
        isSupportLinkShown: isShow,
      }
    }

    default: return state
  }
}

export default authReducer
