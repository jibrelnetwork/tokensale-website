import * as PASSWORD from '../../constants/account/password'

export const openChangeConfirm = () => ({
  type: PASSWORD.OPEN_CHANGE_CONFIRM,
})

export const closeChangeConfirm = () => ({
  type: PASSWORD.CLOSE_CHANGE_CONFIRM,
})

export const changeConfirmRequest = () => ({
  type: PASSWORD.CHANGE_CONFIRM_REQUEST,
})

export const changeConfirmSuccess = () => ({
  type: PASSWORD.CHANGE_CONFIRM_SUCCESS,
})

export const changeConfirmFailure = (error) => ({
  type: PASSWORD.CHANGE_CONFIRM_FAILURE,
  payload: { error },
})
