import { set } from 'lodash/fp'
import * as AUTH from '../constants/auth'

const defaultState = {
  token: undefined,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {

    case AUTH.SET_TOKEN: {
      const { token } = action.payload
      return set('token', token, state)
    }

    case AUTH.RESET_TOKEN: {
      return set('token', undefined, state)
    }

    default: return state
  }
}

export default authReducer
