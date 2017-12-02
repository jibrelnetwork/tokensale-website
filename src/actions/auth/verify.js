import * as VERIFY from '../../constants/auth/verify'

export const setStage = (stage) => ({
  type: VERIFY.SET_STAGE,
  payload: { stage },
})

export const statusRequest = () => ({
  type: VERIFY.STATUS_REQUEST,
})

export const statusRequestCancel = () => ({
  type: VERIFY.STATUS_REQUEST_CANCEL,
})

export const statusRequestSuccess = (status) => ({
  type: VERIFY.STATUS_REQUEST_SUCCESS,
  payload: { status },
})

export const setStatus = statusRequestSuccess

export const confirmTerms = () => ({
  type: VERIFY.CONFIRM_TERMS,
})

export const updateUserInfo = (firstName, lastName, birthday, residency, citizenship) => ({
  type: VERIFY.UPDATE_USER_INFO,
  payload: { firstName, lastName, birthday, residency, citizenship },
})

export const skipDocument = () => ({
  type: VERIFY.SKIP_DOCUMENT,
})

export const uploadDocument = (documentUrl, documentType) => ({
  type: VERIFY.UPLOAD_DOCUMENT,
  payload: { documentUrl, documentType },
})
