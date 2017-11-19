import { push } from 'react-router-redux'
import { put, call, take } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form'
import * as actions from '../../actions'
import * as AUTH from '../../constants/auth'
import request from '../request';
import { SERVER } from '../.'

const FORM = 'login'

export function* login() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { email, password } } = yield take(AUTH.LOGIN)
    const data = { email, password }
    yield put(startSubmit(FORM))
    const loginResponse = yield call(request, `${SERVER}/auth/login/`, data, 'post');
    if (loginResponse && loginResponse.status < 400) {
      const token = loginResponse.data.key
      const accountResponse = yield call(request, `${SERVER}/api/account/`, null, 'get', token);
      if (accountResponse && accountResponse.status < 400) {
        const accountData = {
          verifyStatus: accountResponse.data.onfido_check_result || 'Pending', // ?
          isTermsConfirmed: accountResponse.data.terms_confirmed,
          isUserInfoFilled:
            !!accountResponse.data.first_name &&
            !!accountResponse.data.last_name &&
            !!accountResponse.data.date_of_birth &&
            !!accountResponse.data.citizenship &&
            !!accountResponse.data.residency,
          idDocumentUploaded: !!accountResponse.data.document_url,
        }
        if (!accountData.isTermsConfirmed) {
          yield put(actions.auth.verify.setStage('terms'))
        } else if (!accountData.isUserInfoFilled) {
          yield put(actions.auth.verify.setStage('user-info'))
        } else if (!accountData.idDocumentUploaded) {
          yield put(actions.auth.verify.setStage('document'))
        } else { yield put(actions.auth.verify.setStatus(accountData.verifyStatus)) }
        yield put(stopSubmit(FORM))
        yield put(actions.auth.setToken(token))
        yield put(accountData.verifyStatus ? push('/account') : push('/verify'))
      } else {
        yield put(stopSubmit(FORM))
        alert('Account info request error')
      }
    } else {
      const errors = { password: loginResponse.data.non_field_errors }
      yield put(stopSubmit(FORM, errors))
    }
  }
}
