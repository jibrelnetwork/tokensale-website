// @flow

import type { Saga } from 'redux-saga'

// import LogRocket from 'logrocket'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import { put, call, take } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import request from '../request'
import { SERVER } from '../.'
import { grecaptcha, gtm, authToken, api } from '../../services'

import type { authLoginType } from '../../modules/auth'
import {
  AUTH_LOGIN,
  authSetToken,
  authSetVerifyStatus,
  authSetVerifyStage,
  closeModals,
} from '../../modules'

import { accountUpdate } from '../../modules/account'
import type { accountUpdatePayloadType, VerificationStatus, VerificationStage } from '../../modules/account'

const FORM = 'login'

/*
  firstName: '...',
  lastName: '...',
  email: '...',
  dashboardIsOpen: false,
  transactions: [],
  balance: 0,
  btcAddress: undefined,
  ethAddress: undefined,
  address: undefined,
  isAddressChangeRequested: false,
  isWithdrawRequested: false,
*/

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

export function* requestAccountData(): Saga<void> {
  try {
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
      verifyStatus: accountData.identity_verification_status,
      verifyStage,
    }

    yield put(accountUpdate(updatePayload))
  } catch (e) {
    console.error(e)
  }
}

export function* getUserData(token: string): Saga<void> {
  const response = yield call(request, `${SERVER}/api/account/`, null, 'get', { token })
  if (response.success) {
    const verifyStatus = response.data.identity_verification_status
    const data = {
      isTermsConfirmed: response.data.terms_confirmed,
      isUserInfoFilled:
        !!response.data.first_name &&
        !!response.data.last_name &&
        !!response.data.date_of_birth &&
        !!response.data.citizenship &&
        !!response.data.residency,
      isDocumentUploaded: !!response.data.document_url,
    }

    yield put(authSetVerifyStatus(verifyStatus))

    if (!data.isTermsConfirmed) {
      yield put(authSetVerifyStage('terms'))
    } else if (!data.isUserInfoFilled) {
      yield put(authSetVerifyStage('user-info'))
    } else if (!data.isDocumentUploaded || (verifyStatus === 'Declined')) {
      yield put(authSetVerifyStage('document'))
    }

    yield put(stopSubmit(FORM))

    yield put(closeModals())

    yield put(verifyStatus ? push('/account') : push('/verify'))

    gtm.pushAuthSuccess(verifyStatus === 'Approved')
  } else {
    yield put(stopSubmit(FORM))

    toast.error('Account info request error')
  }
}

type loginRequestFields = {
  email: string,
  password: string,
  captcha: string,
}

type loginResponseFields = {
  key?: string,
  non_field_errors?: Array<string>,
  captcha?: string,
}

export function* login(): Saga<void> {
  // eslint-disable-next-line fp/no-loops
  while (true) {
    const { payload: { email, password, captcha } }: authLoginType = yield take(AUTH_LOGIN)

    const postBody: loginRequestFields = { email: email.toLowerCase(), password, captcha }

    yield put(startSubmit(FORM))

    try {
      const response: loginResponseFields = yield call(api.post, 'auth/login', postBody)

      if (response.key) {
        const token: string = response.key
        // LogRocket.identify(postBody.email)

        authToken.set(token)

        yield put(authSetToken(token))

        yield call(requestAccountData)

        yield put(stopSubmit(FORM))
      } else if (response.non_field_errors) {
        const errors = {
          captcha: response.captcha,
          password: response.non_field_errors,
        }
        if (errors.captcha) {
          grecaptcha.trackLoginError()
          window.grecaptcha.reset()
        }
        yield put(stopSubmit(FORM, errors))
      }

    } catch (e) {
      // server error
      console.error(e)
      yield put(stopSubmit(FORM, { captcha: 'Server error' }))
    }
  }
}

// export function* login(): Saga<void> {
//   // check if we have token in the local storage and set it to redux

//   while (true) { // eslint-disable-line fp/no-loops
//     const { payload: { email, password, captcha } }: authLoginType = yield take(AUTH_LOGIN)

//     const postBody: loginRequestFields = { email: email.toLowerCase(), password, captcha }

//     yield put(startSubmit(FORM))

//     try {
//       const loginToken: loginResponceFields = yield call(api.post, postBody. authToken.get())
//       // LogRocket.identify(data.email)

//     }

//     const response = yield call(request, `${SERVER}/auth/login/`, data, 'post')

//     if (response.success) {
//       const token = response.data.key
//       LogRocket.identify(data.email)
//       if (token) {
//         // set/update auth token
//         authToken.set(token)

//         yield put(authSetToken(token))

//         yield call(requestAccountData)
//         // yield call(getUserData, token)
//       }
//     } else if (response.error) {
//       const errors = {
//         captcha: response.data.captcha,
//         password: response.data.non_field_errors,
//       }
//       if (errors.captcha) {
//         grecaptcha.trackLoginError()
//         window.grecaptcha.reset()
//       }
//       yield put(stopSubmit(FORM, errors))
//     } else {
//       yield put(stopSubmit(FORM))
//     }
//   }
// }
