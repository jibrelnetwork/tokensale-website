// move to inner auth reducer

import { set } from 'lodash/fp'
import * as AUTH from '../constants/auth'

const defaultState = {
  stage: 'terms',
};

const verifyReducer = (state = defaultState, action) => {
  switch (action.type) {

    case AUTH.VERIFY.SET_STAGE: {
      const { stage } = action.payload
      return set('stage', stage, state)
    }

    case AUTH.LOGOUT: {
      return set('stage', defaultState.stage, state)
    }

    default: return state
  }
}

export default verifyReducer
