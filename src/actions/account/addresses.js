import * as ADDRESSES from '../../constants/account/addresses'

export const request = () => ({
  type: ADDRESSES.REQUEST,
})

export const requestSuccess = (ethAddress, btcAddress) => ({
  type: ADDRESSES.REQUEST_SUCCESS,
  payload: { ethAddress, btcAddress },
})
