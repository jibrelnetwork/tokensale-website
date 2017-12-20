import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'

import * as actions from '../../../actions'
import { Input } from '../../common'

const Change = ({ submitting, handleSubmit, t }) => (
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
      <div className="buttons clear">
        <button
          type="submit"
          disabled={submitting}
          className="button pull-left"
        >
          {!submitting && t('auth.resetPassword.submit')}
        </button>
      </div>
    </form>
  </div>
)

Change.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default compose(
  translate(),
  reduxForm({
    form: 'change-password',
    onSubmit: (
      { newPassword, newPasswordConfirm },
      dispatch,
      { match: { params: { uid, token } } }
    ) => dispatch(
      actions.auth.password.change(uid, token, newPassword, newPasswordConfirm)
    ),
    validate: ({ newPassword, newPasswordConfirm }, { t }) => compose(
      !newPassword
        ? set('newPassword', t('auth.resetPassword.errors.newPassword.isRequired'))
        : newPassword.length < 8
          ? set('newPassword', t('auth.resetPassword.errors.newPassword.isTooShort'))
          : identity,
      !newPasswordConfirm
        ? set('newPasswordConfirm', t('auth.resetPassword.errors.newPasswordConfirm.isRequired'))
        : identity,
      newPasswordConfirm && newPassword !== newPasswordConfirm
        ? set('newPasswordConfirm', t('auth.resetPassword.errors.newPasswordConfirm.notMatch'))
        : identity,
    )({}),
  })
)(Change)
