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

type icoActionType = raisedRequestType |
  raisedRequestCancelType |
  raisedRequestSuccessType

export type IcoState = {
  +isFetched: boolean,
  +state: 'presale' | 'sale' | 'sale-ended' | 'ico-ended',
  +presaleEnd: string, // (date or timestamp with timezone)
  +saleEnd: string, // (date or timestamp with timezone)
  +tokenRaised: number,
  +tokenTotal: number,
  +tokenInitial: number,
  +pricePerToken: number
}

const defaultState: IcoState = {
  isFetched: false,
  state: 'presale',
  presaleEnd: '2018-09-24T03:32:45.678Z',
  saleEnd: '2018-10-24T03:32:45.678Z',
  tokenRaised: 250000,
  tokenTotal: 150000,
  tokenInitial: 100000,
  pricePerToken: 0.25,
}

export const icoReducer = (state: IcoState = defaultState, action: icoActionType): IcoState => {
  switch (action.type) {

    case RAISED_REQUEST_SUCCESS: {
      const { amount } = action.payload
      return {
        ...state,
        tokenRaised: amount,
      }
    }

    default:
      return state
  }
}
