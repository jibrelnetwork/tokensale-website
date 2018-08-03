// @flow

/**
 * RAISED_REQUEST
 */
export const RAISED_REQUEST = '@tokens/Raised request'

declare type raisedRequestType = {
  type: '@tokens/Raised request'
}

export const raisedRequest = (): raisedRequestType => ({
  type: RAISED_REQUEST,
})

/**
 * RAISED_REQUEST_CANCEL
 */
export const RAISED_REQUEST_CANCEL = '@tokens/Raised request cancel'

declare type raisedRequestCancelType = {
  type: '@tokens/Raised request cancel'
}

export const raisedRequestCancel = (): raisedRequestCancelType => ({
  type: RAISED_REQUEST_CANCEL,
})


/**
 * RAISED_REQUEST_SUCCESS
 */
export const RAISED_REQUEST_SUCCESS = '@tokens/Raised request success'

declare type raisedRequestSuccessType = {
  type: '@tokens/Raised request success',
  payload: {
    amount: number
  }
}

export const raisedRequestSuccess = (amount: number): raisedRequestSuccessType => ({
  type: RAISED_REQUEST_SUCCESS,
  payload: { amount },
})

type tokenActionType = raisedRequestType |
  raisedRequestCancelType |
  raisedRequestSuccessType

export type TokenState = {
  +raised: number
}

const defaultState: TokenState = {
  raised: 0,
}

export const tokensReducer = (state: TokenState = defaultState, action: tokenActionType): TokenState => {
  switch (action.type) {

    case RAISED_REQUEST_SUCCESS: {
      const { amount } = action.payload
      return {
        ...state,
        raised: amount,
      }
    }

    default:
      return state
  }
}
