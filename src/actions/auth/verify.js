import * as VERIFY from '../../constants/auth/verify'

export const complete = () => ({
  type: VERIFY.COMPLETE,
})

export const changeStage = (stage) => ({
  type: VERIFY.CHANGE_STAGE,
  payload: { stage },
})

export const confirmTerms = () => ({
  type: VERIFY.CONFIRM_TERMS,
})

export const updateUserInfo = (firstName, lastName, birthday, residency, citizenship) => ({
  type: VERIFY.UPDATE_USER_INFO,
  payload: { firstName, lastName, birthday, residency, citizenship },
})

export const uploadDocument = (documentUrl) => ({
  type: VERIFY.UPLOAD_DOCUMENT,
  payload: { documentUrl },
})
