import * as REGISTER from '../../constants/auth/register'

export const changeStage = (stage) => ({
  type: REGISTER.CHANGE_STAGE,
  payload: { stage },
})

export const createAccount = (email, password, passwordConfirm) => ({
  type: REGISTER.CREATE_ACCOUNT,
  payload: { email, password, passwordConfirm },
})

export const confirmTerms = () => ({
  type: REGISTER.CONFIRM_TERMS,
})

export const updateUserInfo = (firstName, lastName, birthday, residency, citizenship) => ({
  type: REGISTER.UPDATE_USER_INFO,
  payload: { firstName, lastName, birthday, residency, citizenship },
})

export const uploadDocument = (documentUrl) => ({
  type: REGISTER.UPLOAD_DOCUMENT,
  payload: { documentUrl },
})
