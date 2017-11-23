import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'

import { Input } from '../../../common'
import { account } from '../../../../actions'

const SetPassword = ({ handleSubmit, submitting }) => (
  <div className="form-block">
    <form onSubmit={handleSubmit} className="form">
      <Field name="password" type="password" component={Input} label="Password" />
      <Field name="newPassword" type="password" component={Input} label="New Password" />
      <Field name="newPasswordConfirm" type="password" component={Input} label="Confirm Password" />
      <div className="clear">
        <button type="submit" className="bordered button pull-right" disabled={submitting}>
          {!submitting && 'Confirm'}
        </button>
      </div>
    </form>
  </div>
)

SetPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'set-password',
  onSubmit: ({ password, newPassword }, dispatch) => dispatch(
    account.password.set(password, newPassword)
  ),
  validate: ({ password, newPassword, newPasswordConfirm }) => compose(
    !password
      ? set('password', 'Password is required')
      : identity,
    !newPassword
      ? set('newPassword', 'New Password is required')
      : newPassword.length < 8
        ? set('newPassword', 'New Password is too short')
        : identity,
    !(newPassword === newPasswordConfirm)
      ? set('newPasswordConfirm', 'Password should match')
      : identity,
  )({}),
  destroyOnUnmount: true,
})(SetPassword)
