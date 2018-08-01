// @flow

// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved, import/extensions
import type { VerifyState, FSA } from 'types'

import * as AUTH from '../constants/auth'

const defaultState: VerifyState = {
  stage: 'terms',
}

const verifyReducer = (state: VerifyState = defaultState, action: FSA) => {
  switch (action.type) {

    case AUTH.VERIFY.SET_STAGE: {
      const { stage } = action.payload
      return {
        ...state,
        stage,
      }
    }

    case AUTH.LOGOUT: {
      return {
        stage: undefined,
      }
    }

    default: return state
  }
}

export default verifyReducer
