// @flow

import React from 'react'

import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'
import { set, compose, identity } from 'lodash/fp'
import { Field, reduxForm } from 'redux-form'

import {
  Input,
  Captcha,
  Button,
  ModalOpenButton,
} from '../common'

import { authLogin } from '../../modules'

const VALIDATE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line max-len

type Props = {
  t: TFunction,
  submitting: boolean,
  handleSubmit: Function,
}

const Login = ({
  t,
  submitting,
  handleSubmit,
}: Props) => (
  <div className="auth">
    <div className="form-block">
      <form
        onSubmit={handleSubmit}
        className="form"
      >
        <Field
          name="email"
          type="text"
          label={t('auth.login.fields.email')}
          component={Input}
        />
        <Field
          name="password"
          type="password"
          label={t('auth.login.fields.password')}
          component={Input}
        />
        <Field name="captcha" component={Captcha} />
        <div className="buttons clear">
          <Button
            type="submit"
            disabled={submitting}
            className="pull-left"
            value="auth.login.submit"
          />
          <ModalOpenButton
            modalName="resetPasswordEmail"
            className="pull-right"
            value="auth.login.links.resetPassword"
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
    form: 'login',
    onSubmit: ({ email, password, captcha }, dispatch) => dispatch(authLogin(email, password, captcha)),
    validate: ({ email, password, captcha }, { t }) => compose(
      !email
        ? set('email', t('auth.login.errors.email.isRequired'))
        : !VALIDATE_EMAIL_REGEXP.test(email)
          ? set('email', t('auth.login.errors.email.isRequired'))
          : identity,
      !password
        ? set('password', t('auth.login.errors.password.isRequired'))
        : password.length < 8
          ? set('password', t('auth.login.errors.password.isTooShort'))
          : identity,
      !captcha
        ? set('captcha', t('auth.login.errors.captcha.isRequired'))
        : identity,
    )({}),
    destroyOnUnmount: true,
  })
)(Login)
