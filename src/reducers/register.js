// move to inner auth reducer

import { set } from 'lodash/fp'
import * as REGISTER from '../constants/auth/register'

const defaultState = {
  stage: 'main',
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {

    case REGISTER.CHANGE_STAGE: {
      const { stage } = action.payload
      return set('stage', stage, state)
    }

    default: return state
  }
}

export default authReducer
