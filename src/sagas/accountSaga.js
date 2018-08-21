// @flow

import type { Saga } from 'redux-saga'

// import LogRocket from 'logrocket'
import { push, replace } from 'connected-react-router'
import { toast } from 'react-toastify'
import { delay } from 'redux-saga'
import { put, call, select, takeEvery, take, fork, cancel } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import moment from 'moment'

import { authToken, api } from '../services'
import { accountSelector } from '../selectors/account'
import type {
  accountEmailVerifyType,
  accountUpdatePayloadType,
  accountUpdateUserInfoType,
  accountVerifyDocumentUploadType,
  accountWithdrawConfirmType,
  accountAddressChangeRequestType,
  accountAddressChangeConfirmType,
} from '../modules/account'

import {
  AUTH_SET_TOKEN,
  AUTH_LOGOUT,
  ACCOUNT_EMAIL_VERIFY,
  ACCOUNT_EMAIL_VERIFY_RESEND,
  ACCOUNT_VERIFY_TERMS_CONFIRM,
  ACCOUNT_UPDATE_USER_INFO,
  ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD,
  ACCOUNT_VERIFY_DOCUMENT_UPLOAD,
  ACCOUNT_WITHDRAW_REQUEST,
  ACCOUNT_WITHDRAW_CONFIRM,
  ACCOUNT_ADDRESS_CHANGE_REQUEST,
  ACCOUNT_ADDRESS_CHANGE_CONFIRM,
  authLogout,
  accountUpdate,
  accountUpdateTransactions,
  accountWithdrawSetRequested,
  accountAddressChangeRequested,
  showModal,
  closeModals,
} from '../modules'

import R from '../routes.yaml'

const ACCOUNT_VERIFY_TERMS_FORM = 'account-verification-terms-form'
const ACCOUNT_VERIFY_USER_INFO_FORM = 'account-verification-user-info-form'
const ACCOUNT_VERIFY_DOCUMENT_UPLOAD_FORM = 'account-verification-document-upload-form'
const ACCOUNT_REQUEST_WITHDRAW_FORM = 'withdraw'
const ACCOUNT_REQUEST_ADDRESS_CHANGE_FORM = 'set-address'

type responseAccountType = {
  // auth fields
  username: string, // -> email

  // account fields
  first_name: string, // -> firstName
  last_name: string, // -> lastName
  date_of_birth: ?string, // -> birthday

  citizenship: string, // -> citizenship
  residency: string, // -> residency

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
  } else if (!isUserInfoFilled || (accountData.identity_verification_status === 'Declined')) {
    verifyStage = 'user-info'
  } else if (!isDocumentUploaded) {
    verifyStage = 'document'
  } else {
    verifyStage = 'loader'
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
    birthday: accountData.date_of_birth || '',
    citizenship: accountData.citizenship,
    residency: accountData.residency,
    verifyStage,
  }

  yield put(accountUpdate(updatePayload))
}

export function* accountRequestData(): Saga<void> {
  const accountData: responseAccountType = yield call(api.get, 'api/account', {}, authToken.get())
  yield* accountUpdateFromRequest(accountData)
}

type responseAccountTransactions = {
  success: boolean,
  // @TODO: flow
  data: Array<Object>,
}

// @TODO: gtm integration
// function pushNewTransactionEvent(transactions) {
//   const isNewTransactionEventSended = (storage.getNewTransactionEventSended() === '1')

//   if (isNewTransactionEventSended || (transactions && (transactions.length === 0))) {
//     return
//   }

//   gtm.pushNewTransaction()
//   storage.setNewTransactionEventSended('1')
// }

export function* accountRequestTransactons(): Saga<void> {
  const response: responseAccountTransactions = yield call(api.get, 'api/transactions', {}, authToken.get())
  if (response.success) {
    yield put(accountUpdateTransactions(response.data))
    // pushNewTransactionEvent
  }
}

export function* redirectAfterLogin(): Saga<void> {
  const {
    verifyStatus,
    verifyStage,
    isEmailConfirmed,
  } = yield select(accountSelector)

  if (!isEmailConfirmed) {
    yield put(push(R.VERIFY_EMAIL_SENDED.path))
  } else if (verifyStatus === 'Approved' || verifyStatus === 'Preliminarily approoved') {
    yield put(push(R.ACCOUNT.path))
  } else if (verifyStage === 'terms') {
    yield put(push(R.VERIFY_TERMS.path))
  } else if (verifyStage === 'user-info') {
    yield put(push(R.VERIFY_USER_INFO.path))
  } else {
    yield put(push(R.VERIFY_DOCUMENT.path))
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
    // redirect to the next page
    yield put(replace(R.VERIFY_USER_INFO.path))
  } catch (e) {
    yield put(stopSubmit(ACCOUNT_VERIFY_TERMS_FORM))
    if (e.code === 301) {
      put(authLogout())
    }
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

    yield put(push(R.VERIFY_DOCUMENT.path))
  } catch (e) {
    yield put(stopSubmit(ACCOUNT_VERIFY_USER_INFO_FORM))

    if (e.code === 301) {
      put(authLogout())
    }
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

    if (e.code === 301) {
      put(authLogout())
    }
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
  const { payload: { document: documentFile } } = action

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

    if (e.code === 301) {
      put(authLogout())
    }
  }
}

/**
 * Request Withdraw
 */
function* requestWithdraw(): Saga<void> {
  yield put(startSubmit(ACCOUNT_REQUEST_WITHDRAW_FORM))
  try {
    const response = yield call(api.post, 'api/withdraw-jnt', null, authToken.get())
    if (response.success) {
      // refresh balance
      yield* accountRequestData()
      yield put(accountWithdrawSetRequested(true))

      yield put(stopSubmit(ACCOUNT_REQUEST_WITHDRAW_FORM))
      // @TODO: Google integration
      // gtm.pushProfileRequestWithdraw()
    } else {
      yield put(stopSubmit(ACCOUNT_REQUEST_WITHDRAW_FORM))
    }
  } catch (e) {
    // @TODO: How we will handle errors here?
    yield put(stopSubmit(ACCOUNT_REQUEST_WITHDRAW_FORM))

    if (e.code === 301) {
      put(authLogout())
    }
  }
}

function* withdrawConfirm(action: accountWithdrawConfirmType): Saga<void> {
  const { payload: { operationId, token } } = action

  const postData = { operation_id: operationId, token }

  const response = yield call(api.post, 'api/withdraw-jnt/confirm', postData, authToken.get())

  // @TODO: fix links
  if (response.success) {
    yield put(replace('/welcome/withdraw-confirm/success'))
  } else if (response.error) {
    // yield put(replace({
    //   state: { message: get(['data', 'detail'], response) },
    //   pathname: '/welcome/withdraw-confirm/fail',
    // }))
  } else {
    yield put(replace('/welcome/withdraw-confirm/fail'))
  }
}

/**
 * Request address change
 */
function* requestAddressChange(action: accountAddressChangeRequestType): Saga<void> {
  const { payload: { address } } = action

  yield put(startSubmit(ACCOUNT_REQUEST_ADDRESS_CHANGE_FORM))
  try {
    const response = yield call(api.put, 'api/withdraw-address', { address }, authToken.get())
    if (response.address) {
      yield put(accountAddressChangeRequested(true))
      yield put(stopSubmit(ACCOUNT_REQUEST_ADDRESS_CHANGE_FORM))
      yield put(reset(ACCOUNT_REQUEST_ADDRESS_CHANGE_FORM))
      yield put(showModal('set-address-success'))
      // @TODO: google integration
      // gtm.pushProfileAddedEth()
    }
  } catch (e) {
    const { code, data, statusText } = e
    if (code === 301) {
      yield put(stopSubmit(ACCOUNT_REQUEST_ADDRESS_CHANGE_FORM))
      yield put(closeModals())
      yield put(authLogout())
    } else if (data.fail) {
      yield put(stopSubmit(ACCOUNT_REQUEST_ADDRESS_CHANGE_FORM, { address: data.fail }))
    } else if (data.data) {
      const err = data.data
      if (err.address && (err.address.length > 0)) {
        yield put(stopSubmit(ACCOUNT_REQUEST_ADDRESS_CHANGE_FORM, { address: err.address[0] }))
      } else if (err.detail) {
        yield put(stopSubmit(ACCOUNT_REQUEST_ADDRESS_CHANGE_FORM, { address: err.detail }))
      } else {
        yield put(stopSubmit(ACCOUNT_REQUEST_ADDRESS_CHANGE_FORM, { address: 'Internal server error' }))
      }
    } else {
      yield put(stopSubmit(ACCOUNT_REQUEST_ADDRESS_CHANGE_FORM, { address: statusText }))
    }
  }
}

/**
 * Confirm address change
 */
export function* addressChangeConfirm(action: accountAddressChangeConfirmType): Saga<void> {
  const { payload: { operationId, token } } = action
  const postData = { operation_id: operationId, token }
  try {
    // @TODO: check, do we need user authorisation for this action???
    yield call(api.post, 'api/withdraw-address/confirm', postData, 'post')
    yield put(replace(R.CONFIRM_ADDRESS_CHANGE_SUCCESS.path))
  } catch (e) {
    if (e.data.data) {
      yield put(replace({
        state: { message: e.data.data.detail },
        pathname: R.CONFIRM_ADDRESS_CHANGE_FAIL.path,
      }))
    } else {
      yield put(replace(R.CONFIRM_ADDRESS_CHANGE_FAIL.path))
    }
  }
}

/**
 * Account refresh
 */
function* accountRefreshLoop(): Saga<void> {
  // eslint-disable-next-line fp/no-loops
  while (true) {
    try {
      // refresh account data
      yield* accountRequestData()
      // @TODO: run this only for approoved accounts
      yield* accountRequestTransactons()
    } catch (e) {
      if (e.code === 301) {
        put(authLogout())
      }
    }

    yield call(delay, 10000)
  }
}

export function* accountRefreshSaga(): Saga<void> {
  // eslint-disable-next-line fp/no-loops
  while (true) {
    yield take(AUTH_SET_TOKEN)
    // @TODO: flow
    const accountRefreshTask = yield fork(accountRefreshLoop)

    yield take(AUTH_LOGOUT)

    yield cancel(accountRefreshTask)
  }
}

export function* accountRootSaga(): Saga<void> {
  yield takeEvery(ACCOUNT_EMAIL_VERIFY, verifyEmail)
  yield takeEvery(ACCOUNT_EMAIL_VERIFY_RESEND, resendEmailVerification)
  yield takeEvery(ACCOUNT_VERIFY_TERMS_CONFIRM, verifyTermsConfirm)
  yield takeEvery(ACCOUNT_UPDATE_USER_INFO, updateUserInfo)
  yield takeEvery(ACCOUNT_VERIFY_SKIP_DOCUMENT_UPLOAD, skipDocumentUpload)
  yield takeEvery(ACCOUNT_VERIFY_DOCUMENT_UPLOAD, uploadDocument)
  yield takeEvery(ACCOUNT_WITHDRAW_REQUEST, requestWithdraw)
  yield takeEvery(ACCOUNT_WITHDRAW_CONFIRM, withdrawConfirm)
  yield takeEvery(ACCOUNT_ADDRESS_CHANGE_REQUEST, requestAddressChange)
  yield takeEvery(ACCOUNT_ADDRESS_CHANGE_CONFIRM, addressChangeConfirm)
}
