// @flow

import type { Saga } from 'redux-saga'

// import LogRocket from 'logrocket'
import { push, replace } from 'connected-react-router'
import { toast } from 'react-toastify'
import { put, call, select, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import moment from 'moment'

import { authToken, api } from '../services'
import { accountSelector } from '../selectors/account'
import type {
  accountEmailVerifyType,
  accountUpdatePayloadType,
  VerificationStatus,
  VerificationStage,
  accountUpdateUserInfoType,
  accountVerifyDocumentUploadType,
} from '../modules/account'

import {
  ACCOUNT_EMAIL_VERIFY,
  ACCOUNT_EMAIL_VERIFY_RESEND,
  ACCOUNT_VERIFY_TERMS_CONFIRM,
  ACCOUNT_UPDATE_USER_INFO,
  ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD,
  ACCOUNT_VERIFY_DOCUMENT_UPLOAD,
  authLogout,
  accountUpdate,
  closeModals,
} from '../modules'

import R from '../routes.yaml'

const ACCOUNT_VERIFY_TERMS_FORM = 'account-verification-terms-form'
const ACCOUNT_VERIFY_USER_INFO_FORM = 'account-verification-user-info-form'
const ACCOUNT_VERIFY_DOCUMENT_UPLOAD_FORM = 'account-verification-document-upload-form'

type responseAccountType = {
  // auth fields
  username: string, // -> email

  // account fields
  first_name: string, // -> firstName
  last_name: string, // -> lastName
  date_of_birth: ?string,

  citizenship: string, // -> address
  residency: string,

  terms_confirmed: boolean,
  is_document_skipped: boolean,
  is_email_confirmed: boolean,
  verification_form_status: ?string,

  document_type: string,
  document_url: string,
  identity_verification_status: VerificationStatus, // -> verifyStatus

  // payment options
  btc_address: string, // -> btcAddress
  eth_address: string, // -> ethAddress
  jnt_balance: number, // -> balance
}

function* accountUpdateFromRequest(accountData: responseAccountType): Saga<void> {
  const isUserInfoFilled =
    !!accountData.first_name &&
    !!accountData.last_name &&
    !!accountData.date_of_birth &&
    !!accountData.citizenship &&
    !!accountData.residency

  const isDocumentUploaded: boolean = !!accountData.document_url

  /* eslint-disable fp/no-let, fp/no-mutation */
  let verifyStage: VerificationStage = 'terms'
  if (!accountData.terms_confirmed) {
    verifyStage = 'terms'
  } else if (!isUserInfoFilled) {
    verifyStage = 'user-info'
  } else if (!isDocumentUploaded || (accountData.identity_verification_status === 'Declined')) {
    verifyStage = 'document'
  }
  /* eslint-enable */

  const updatePayload: accountUpdatePayloadType = {
    firstName: accountData.first_name,
    lastName: accountData.last_name,
    email: accountData.username,
    btcAddress: accountData.btc_address,
    ethAddress: accountData.eth_address,
    balance: accountData.jnt_balance,
    isEmailConfirmed: accountData.is_email_confirmed,
    verifyStatus: accountData.identity_verification_status,
    isDocumentUploadSkipped: accountData.is_document_skipped,
    verifyStage,
  }

  yield put(accountUpdate(updatePayload))
}

export function* accountRequestData(): Saga<void> {
  const accountData: responseAccountType = yield call(api.get, 'api/account', {}, authToken.get())
  yield* accountUpdateFromRequest(accountData)
}

export function* redirectAfterLogin(): Saga<void> {
  const {
    verifyStatus,
    isEmailConfirmed,
  } = yield select(accountSelector)

  if (!isEmailConfirmed) {
    // yield put(push('/welcome/email/sended'))
    yield put(push(R.VERIFY_EMAIL_SENDED.path))
  } else if (verifyStatus === 'Approved') {
    yield put(push(R.ACCOUNT.path))
  } else {
    yield put(push(R.VERIFY.path))
  }
}

/**
 * Email verification
 * Got verification link from email
 * @TODO: Check how it works, now server side is not working
 *
 * Actions: ACCOUNT_EMAIL_VERIFY
 */
type requestEmailVerifyType = {
  key: string,
}

type responseEmailVerifyType = {
  success: boolean,
}

function* verifyEmail(action: accountEmailVerifyType): Saga<void> {
  const { payload: { key } } = action
  const postData: requestEmailVerifyType = { key }

  try {
    // it will return 200 code if success
    const response: responseEmailVerifyType =
      yield call(api.post, 'auth/registration/verify-email', postData, authToken.get())

    console.log(response) // @TODO: to be investigated

    yield put(replace(R.VERIFY_EMAIL_VERIFIED.path))
  } catch (e) {
    console.error(e)
    yield put(replace(R.VERIFY_EMAIL_DECLINED.path))
  }
}

/**
 * Email verification resend
 * Send new verification link to email
 * @TODO: Check how it works, now server side is not working
 *
 * Actions: ACCOUNT_EMAIL_VERIFY_RESEND
 */
type requestEmailVerifyResendType = {
  email: string,
}

type responseEmailVerifyResendType = {
  success: boolean,
}

function* resendEmailVerification(): Saga<void> {
  const { email } = yield select(accountSelector)
  const postData: requestEmailVerifyResendType = { email: email.toLowerCase() }

  try {
    const response: responseEmailVerifyResendType =
      yield call(api.post, 'auth/registration/confirm-email-resend', postData, authToken.get())

    console.log(response) // @TODO: to be investigated

    yield put(replace(R.VERIFY_EMAIL_SENDED.path))
  } catch (e) {
    console.error(e)
    toast.error('Error on email verification resend')
  }
}

/**
 * Account verification, terms confirm
 * Actions: ACCOUNT_UPDATE
 */
function* verifyTermsConfirm(): Saga<void> {
  const putData = { terms_confirmed: true }

  yield put(startSubmit(ACCOUNT_VERIFY_TERMS_FORM))
  try {
    const accountData: responseAccountType
        = yield call(api.put, 'api/account', putData, authToken.get())

    if (accountData.terms_confirmed) {
      yield* accountUpdateFromRequest(accountData)
    }
    yield put(stopSubmit(ACCOUNT_VERIFY_TERMS_FORM))
  } catch (e) {
    if (e.code === 301) {
      put(authLogout())
    }
    yield put(stopSubmit(ACCOUNT_VERIFY_TERMS_FORM))
  }
}

/**
 * Account update user information
 * Actions: ACCOUNT_UPDATE
 */
type requestUserInfoType = {
  residency: string,
  citizenship: string,
  last_name: string,
  first_name: string,
  date_of_birth: string,
}

function* updateUserInfo(action: accountUpdateUserInfoType): Saga<void> {
  const {
    payload: { firstName, lastName, birthday, residency, citizenship },
  } = action

  const putData: requestUserInfoType = {
    first_name: firstName,
    last_name: lastName,
    residency,
    citizenship,
    date_of_birth: moment(birthday).format('YYYY-MM-DD'),
  }

  yield put(startSubmit(ACCOUNT_VERIFY_USER_INFO_FORM))

  try {
    const accountData: responseAccountType
        = yield call(api.put, 'api/account', putData, authToken.get())

    console.log(accountData)

    yield* accountUpdateFromRequest(accountData)

    // gtm.pushVerificationNextStep('BasicInfo')

    // @TODO: handle errors
    // const errors = {
    //   lastName: response.data.lastName,
    //   birthday: response.data.date_of_birth,
    //   firstName: response.data.first_name,
    //   residency: response.data.residency,
    //   citizenship: response.data.citizenship,
    // }
    // yield put(stopSubmit(form, errors))

    yield put(stopSubmit(ACCOUNT_VERIFY_USER_INFO_FORM))
  } catch (e) {
    yield put(stopSubmit(ACCOUNT_VERIFY_USER_INFO_FORM))
  }
}

/**
 * Skip document upload
 * Actions: ACCOUNT_UPDATE
 */
function* skipDocumentUpload(): Saga<void> {
  const putData = { is_document_skipped: true }

  try {
    const accountData: responseAccountType
        = yield call(api.put, 'api/account', putData, authToken.get())

    if (accountData.is_document_skipped) {
      yield* accountUpdateFromRequest(accountData)
      yield put(closeModals())
      yield put(push(R.ACCOUNT.path))
    }
  } catch (e) {
    // @TODO: error handling
    toast.error(e.message)
  }
}

// const { payload: { document } } = yield take(VERIFY.UPLOAD_DOCUMENT)
// const form = yield select(getForm)
// yield put(startSubmit(form))
// const formData = new FormData()
// formData.append('image', document, document.name)
// const response = yield call(request, `${SERVER}/api/document/`, formData, 'post', { isFileUpload: true })
// if (response.success) {
//   LogRocket.track('Document upload success')
//   gtm.pushVerificationNextStep('PassportScan')
//   yield put(stopSubmit(form))
//   yield put(actions.auth.verify.setStatus('Preliminarily Approved'))
//   yield put(actions.auth.verify.setStage('loader'))
//   yield delay(25000)
//   yield call(getStatus)
//   gtm.pushRegistrationSuccess()
// } else if (response.error) {
//   LogRocket.track('Document upload error')
//   const errors = { document: response.data.error }
//   yield put(stopSubmit(form, errors))
// } else {
//   LogRocket.track('Document upload error')
//   yield put(stopSubmit(form))
// }

function* uploadDocument(action: accountVerifyDocumentUploadType): Saga<void> {
  const { payload: { documentFile } } = action

  yield put(startSubmit(ACCOUNT_VERIFY_DOCUMENT_UPLOAD_FORM))

  const formData: FormData = new FormData()
  formData.append('image', documentFile, documentFile.name)
  try {
    const response = yield call(api.form, 'api/document', formData, authToken.get())

    console.log(response)

    yield put(stopSubmit(ACCOUNT_VERIFY_DOCUMENT_UPLOAD_FORM))

  } catch (e) {
    const errors = { document: e.data.error }
    yield put(stopSubmit(ACCOUNT_VERIFY_DOCUMENT_UPLOAD_FORM, errors))
  }
}

export function* accountRootSaga(): Saga<void> {
  yield takeEvery(ACCOUNT_EMAIL_VERIFY, verifyEmail)
  yield takeEvery(ACCOUNT_EMAIL_VERIFY_RESEND, resendEmailVerification)
  yield takeEvery(ACCOUNT_VERIFY_TERMS_CONFIRM, verifyTermsConfirm)
  yield takeEvery(ACCOUNT_UPDATE_USER_INFO, updateUserInfo)
  yield takeEvery(ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD, skipDocumentUpload)
  yield takeEvery(ACCOUNT_VERIFY_DOCUMENT_UPLOAD, uploadDocument)
}
