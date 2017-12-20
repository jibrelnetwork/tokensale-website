import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { translate } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'

import * as actions from '../../../actions'
import { Input } from '../../common'

const VALIDATE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line max-len

const Reset = ({ submitting, handleSubmit, t }) => (
  <div className="form-block">
    <form onSubmit={handleSubmit} className="form">
      <Field
        name="email"
        type="text"
        label={t('auth.sendResetPasswordEmail.fields.email')}
        component={Input}
      />
      <div className="buttons clear">
        <button
          type="submit"
          disabled={submitting}
          className="button pull-left"
        >
          {!submitting && t('auth.sendResetPasswordEmail.submit')}
        </button>
      </div>
    </form>
  </div>
)

Reset.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default compose(
  translate(),
  reduxForm({
    form: 'reset-password',
    onSubmit: ({ email }, dispatch) => dispatch(
      actions.auth.password.reset(email)
    ),
    validate: ({ email }, { t }) => !email
      ? { email: t('auth.sendResetPasswordEmail.errors.email.isRequired') }
      : !VALIDATE_EMAIL_REGEXP.test(email)
        ? { email: t('auth.sendResetPasswordEmail.errors.email.isInvalid') }
        : {},
  })
)(Reset)
