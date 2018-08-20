// @flow

import React from 'react'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import { assoc, compose, identity } from 'ramda'

import { authResetPasswordChange } from '../../../modules'
import { Input, Button } from '../../common'

type Props = {
  submitting: boolean,
  handleSubmit: Function,
  t: TFunction,
}

const Change = ({ submitting, handleSubmit, t }: Props) => (
  <div className="form-block">
    <form onSubmit={handleSubmit} className="form">
      <Field
        name="newPassword"
        type="password"
        label={t('auth.resetPassword.fields.newPassword')}
        component={Input}
      />
      <Field
        name="newPasswordConfirm"
        type="password"
        label={t('auth.resetPassword.fields.newPasswordConfirm')}
        component={Input}
      />
      <div className="buttons clear center">
        <Button
          type="submit"
          disabled={submitting}
          value="auth.resetPassword.submit"
        />
      </div>
    </form>
  </div>
)

export default compose(
  translate(),
  reduxForm({
    form: 'change-password',
    destroyOnUnmount: true,
    onSubmit: (
      { newPassword, newPasswordConfirm },
      dispatch,
      { match: { params: { uid, token } } }
    ) => dispatch(
      authResetPasswordChange(uid, token, newPassword, newPasswordConfirm)
    ),
    validate: ({ newPassword, newPasswordConfirm }, { t }) => compose(
      !newPassword
        ? assoc('newPassword', t('auth.resetPassword.errors.newPassword.isRequired'))
        : newPassword.length < 8
          ? assoc('newPassword', t('auth.resetPassword.errors.newPassword.isTooShort'))
          : identity,
      !newPasswordConfirm
        ? assoc('newPasswordConfirm', t('auth.resetPassword.errors.newPasswordConfirm.isRequired'))
        : identity,
      newPasswordConfirm && newPassword !== newPasswordConfirm
        ? assoc('newPasswordConfirm', t('auth.resetPassword.errors.newPasswordConfirm.notMatch'))
        : identity,
    )({}),
  })
)(Change)
