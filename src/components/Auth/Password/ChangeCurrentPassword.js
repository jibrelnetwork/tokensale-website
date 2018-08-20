// @flow

import React from 'react'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import { assoc, compose, identity } from 'ramda'

import { authChangeCurrentPassword } from '../../../modules'
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
        name="oldPassword"
        type="password"
        label={t('account.changePassword.oldPassword')}
        component={Input}
      />
      <Field
        name="newPassword"
        type="password"
        label={t('account.changePassword.newPassword')}
        component={Input}
      />
      <Field
        name="newPasswordConfirm"
        type="password"
        label={t('account.changePassword.newPasswordConfirm')}
        component={Input}
      />
      <div className="buttons clear center">
        <Button
          type="submit"
          disabled={submitting}
          value="account.changePassword.button"
        />
      </div>
    </form>
  </div>
)

export default compose(
  translate(),
  reduxForm({
    form: 'change-current-password',
    destroyOnUnmount: true,
    onSubmit: (
      { oldPassword, newPassword },
      dispatch
    ) => dispatch(
      authChangeCurrentPassword(oldPassword, newPassword)
    ),
    validate: ({ oldPassword, newPassword, newPasswordConfirm }, { t }) => compose(
      !oldPassword
        ? assoc('oldPassword', t('auth.resetPassword.errors.newPassword.isRequired'))
        : identity,
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
