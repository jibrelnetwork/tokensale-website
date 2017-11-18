import { set } from 'lodash/fp'
import * as AUTH from '../constants/auth'

const defaultState = {
  token: undefined,
  /* Verification statuses, one of "pending", "approved", "declined"
     all statuses means that user completed all steps of verification
     and waits server response with results */
  verifyStatus: undefined,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {

    case AUTH.SET_TOKEN: {
      const { token } = action.payload
      return set('token', token, state)
    }

    case AUTH.LOGOUT: {
      return set('token', undefined, state)
    }

    case AUTH.VERIFY.SET_STATUS: {
      const { status } = action.payload
      return set('verifyStatus', status, state)
    }

    default: return state
  }
}

export default authReducer
