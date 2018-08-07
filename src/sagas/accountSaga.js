// @flow

import type { Saga } from 'redux-saga'

// import LogRocket from 'logrocket'
import { push } from 'connected-react-router'
// import { toast } from 'react-toastify'
import { put, call, select } from 'redux-saga/effects'
// import { startSubmit, stopSubmit } from 'redux-form'

import { authToken, api } from '../services'

import { accountSelector } from '../selectors/account'
import { accountUpdate } from '../modules/account'
import type { accountUpdatePayloadType, VerificationStatus, VerificationStage } from '../modules/account'

export type responseAccountType = {
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

export function* accountRequestData(): Saga<void> {
  const accountData: responseAccountType = yield call(api.get, 'api/account', {}, authToken.get())

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
    verifyStage,
  }

  yield put(accountUpdate(updatePayload))

  // yield put(verifyStatus ? push('/account') : push('/verify'))

  // gtm.pushAuthSuccess(verifyStatus === 'Approved')
}

export function* redirectAfterLogin(): Saga<void> {
  const {
    verifyStatus,
    isEmailConfirmed,
  } = yield select(accountSelector)

  if (!isEmailConfirmed) {
    // yield put(push('/welcome/email/sended'))
    yield put(push('/email-verify'))
  } else if (verifyStatus === 'Approved') {
    yield put(push('/account'))
  } else {
    yield put(push('/verify'))
  }
}
