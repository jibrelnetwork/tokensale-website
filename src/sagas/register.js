import { startSubmit, stopSubmit } from 'redux-form'
import { put, call, take } from 'redux-saga/effects';
import format from 'date-fns/format'
import * as REGISTER from '../constants/auth/register'
import * as actions from '../actions'
import request from './request';

const form = 'register'
const server = (api) => `http://37.59.55.6:8080${api}`

export function* createAccount() {
  while (true) { // eslint-disable-line fp/no-loops
    const {
      payload: { email, password, passwordConfirm },
    } = yield take(REGISTER.CREATE_ACCOUNT)
    const data = {
      email,
      password,
      password_confirm: passwordConfirm,
    }
    yield put(startSubmit(form))
    const response = yield call(request, server('/auth/registration/'), data, 'post');
    if (response && response.status < 400) {
      yield put(actions.auth.setToken(response.data.key))
      yield put(stopSubmit(form))
      yield put(actions.auth.register.changeStage('terms'))
    } else {
      const errors = {
        email: response.data.email,
        password: response.data.password,
        passwordConfirm: response.data.password_confirm,
      }
      yield put(stopSubmit(form, errors))
    }
  }
}

export function* confirmTerms() {
  while (true) { // eslint-disable-line fp/no-loops
    yield take(REGISTER.CONFIRM_TERMS)
    const data = { terms_confirmed: true }
    yield put(startSubmit(form))
    const response = yield call(request, server('/api/account/'), data, 'put');
    if (response && response.status < 400) {
      yield put(stopSubmit(form))
      yield put(actions.auth.register.changeStage('user-info'))
    } else {
      yield put(stopSubmit(form))
    }
  }
}

export function* updateUserInfo() {
  while (true) { // eslint-disable-line fp/no-loops
    const {
      payload: { firstName, lastName, birthday, residency, citizenship },
    } = yield take(REGISTER.UPDATE_USER_INFO)
    const data = {
      residency,
      last_name: lastName,
      first_name: firstName,
      citizenship,
      date_of_birth: format(new Date(birthday), 'YYYY-MM-DD'),
    }
    yield put(startSubmit(form))
    const response = yield call(request, server('/api/account/'), data, 'put');
    if (response && response.status < 400) {
      yield put(stopSubmit(form))
      yield put(actions.auth.register.changeStage('document'))
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
    const { payload: { documentUrl } } = yield take(REGISTER.UPLOAD_DOCUMENT)
    const data = { document_url: documentUrl }
    yield put(startSubmit(form))
    const response = yield call(request, server('/api/account/'), data, 'put');
    if (response && response.status < 400) {
      yield put(stopSubmit(form))
      yield put(actions.auth.register.changeStage('email-verification'))
    } else {
      const errors = { documentUrl: response.data.document_url }
      yield put(stopSubmit(form, errors))
    }
  }
}
