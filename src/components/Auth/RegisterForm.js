// @flow

import React from 'react'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'

import { Input, Captcha, Button, ModalOpenButton } from '../common'

import { authCreateAccount } from '../../modules'

const VALIDATE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line max-len

type Props = {
  t: TFunction,
  submitting: boolean,
  handleSubmit: Function
}

const Register = ({ t, submitting, handleSubmit }: Props) => (
  <div className="auth">
    <div className="form-block">
      <form onSubmit={handleSubmit} className="form">
        <Field
          name="email"
          type="text"
          label={t('auth.registration.fields.email')}
          component={Input}
        />
        <Field
          name="password"
          type="password"
          label={t('auth.registration.fields.password')}
          component={Input}
        />
        <Field
          name="passwordConfirm"
          type="password"
          label={t('auth.registration.fields.passwordConfirm')}
          component={Input}
        />
        <Field
          name="captcha"
          component={Captcha}
        />
        <div className="buttons clear">
          <Button
            type="submit"
            disabled={submitting}
            className="pull-left"
            value="auth.registration.submit"
          />
          <ModalOpenButton
            modalName="login"
            className="pull-right"
            value="auth.registration.links.login"
            colorStyle="transparent"
          />
        </div>
      </form>
    </div>
  </div>
)

export default compose(
  translate(),
  reduxForm({
    form: 'register',
    onSubmit: ({ email, password, passwordConfirm, captcha }, dispatch) =>
      dispatch(authCreateAccount(email, password, passwordConfirm, captcha)),
    validate: ({ email, password, passwordConfirm, captcha }, { t }) => compose(
      !email
        ? set('email', t('auth.registration.errors.email.isRequired'))
        : !VALIDATE_EMAIL_REGEXP.test(email)
          ? set('email', t('auth.registration.errors.email.isInvalid'))
          : identity,
      !password
        ? set('password', t('auth.registration.errors.password.isRequired'))
        : password.length < 8
          ? set('password', t('auth.registration.errors.password.isTooShort'))
          : identity,
      !passwordConfirm
        ? set('passwordConfirm', t('auth.registration.errors.passwordConfirm.isRequired'))
        : identity,
      passwordConfirm && password !== passwordConfirm
        ? set('passwordConfirm', t('auth.registration.errors.passwordConfirm.notMatch'))
        : identity,
      !captcha
        ? set('captcha', t('auth.registration.errors.captcha.isRequired'))
        : identity,
    )({}),
  }),
)(Register)
