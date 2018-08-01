// @flow

/* ::
import type { TokenState, FSA } from 'types'
*/

import * as TOKENS from '../constants/tokens'

const defaultState: TokenState = {
  raised: 80000000,
}

const tokensReducer = (state: TokenState = defaultState, action: FSA) => {
  switch (action.type) {

    case TOKENS.RAISED_REQUEST_SUCCESS: {
      const { amount } = action.payload
      return {
        ...state,
        raised: amount,
      }
    }

    default: return state
  }
}

export default tokensReducer
