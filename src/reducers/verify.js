// move to inner auth reducer

import { set } from 'lodash/fp'
import * as VERIFY from '../constants/auth/verify'

const defaultState = {
  stage: 'terms',
};

const verifyReducer = (state = defaultState, action) => {
  switch (action.type) {

    case VERIFY.SET_STAGE: {
      const { stage } = action.payload
      return set('stage', stage, state)
    }

    default: return state
  }
}

export default verifyReducer
