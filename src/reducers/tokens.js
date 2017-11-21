import { set } from 'lodash/fp'
import * as TOKENS from '../constants/tokens'

const defaultState = {
  raised: 12000000,
}

const tokensReducer = (state = defaultState, action) => {
  switch (action.type) {

    case TOKENS.RAISED_REQUEST_SUCCESS: {
      const { amount } = action.payload
      return set('raised', amount, state)
    }

    default: return state
  }
}

export default tokensReducer
