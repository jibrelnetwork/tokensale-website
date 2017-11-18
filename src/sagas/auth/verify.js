import moment from 'moment'
// import { push } from 'react-router-redux'
import { put, call, take, select } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form'
import * as VERIFY from '../../constants/auth/verify'
import * as actions from '../../actions'
import request from '../request';
import { SERVER } from '../.'

const getForm = (state) => `account-${state.auth.token}`

export function* confirmTerms() {
  while (true) { // eslint-disable-line fp/no-loops
    yield take(VERIFY.CONFIRM_TERMS)
    const form = yield select(getForm)
    const data = { terms_confirmed: true }
    yield put(startSubmit(form))
    const response = yield call(request, `${SERVER}/api/account/`, data, 'put');
    if (response && response.status < 400) {
      yield put(stopSubmit(form))
      yield put(actions.auth.verify.setStage('user-info'))
    } else {
      yield put(stopSubmit(form))
    }
  }
}

export function* updateUserInfo() {
  while (true) { // eslint-disable-line fp/no-loops
    const {
      payload: { firstName, lastName, birthday, residency, citizenship },
    } = yield take(VERIFY.UPDATE_USER_INFO)
    const form = yield select(getForm)
    const data = {
      residency,
      last_name: lastName,
      first_name: firstName,
      citizenship,
      date_of_birth: moment(birthday).format('YYYY-MM-DD'),
    }
    yield put(startSubmit(form))
    const response = yield call(request, `${SERVER}/api/account/`, data, 'put');
    if (response && response.status < 400) {
      yield put(stopSubmit(form))
      yield put(actions.auth.verify.setStage('document'))
    } else {
      const errors = {
        lastName: response.data.lastName,
        birthday: response.data.date_of_birth,
        firstName: response.data.first_name,
        residency: response.data.residency,
        citizenship: response.data.citizenship,
      }
      yield put(stopSubmit(form, errors))
    }
  }
}

export function* uploadDocument() {
  while (true) { // eslint-disable-line fp/no-loops
    const { payload: { documentUrl } } = yield take(VERIFY.UPLOAD_DOCUMENT)
    const form = yield select(getForm)
    const data = { document_url: documentUrl }
    yield put(startSubmit(form))
    const response = yield call(request, `${SERVER}/api/account/`, data, 'put');
    if (response && response.status < 400) {
      yield put(stopSubmit(form))
      yield put(actions.auth.verify.setStatus('pending'))
      yield put(actions.auth.verify.setStage('loader'))
    } else {
      const errors = { documentUrl: response.data.document_url }
      yield put(stopSubmit(form, errors))
    }
  }
}
