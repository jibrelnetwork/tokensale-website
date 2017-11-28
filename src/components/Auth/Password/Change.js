import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'
import * as actions from '../../../actions'
import { Input } from '../../common'

const Change = ({ submitting, handleSubmit }) => (
  <div className="form-block">
    <form onSubmit={handleSubmit} className="form">
      <Field
        name="newPassword"
        type="password"
        label="New password"
        component={Input}
      />
      <Field
        name="newPasswordConfirm"
        type="password"
        label="New password confirmation"
        component={Input}
      />
      <div className="buttons clear">
        <button
          type="submit"
          disabled={submitting}
          className="button pull-left"
        >
          {!submitting && 'Change password'}
        </button>
      </div>
    </form>
  </div>
)

Change.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'change-password',
  onSubmit: (
    { newPassword, newPasswordConfirm },
    dispatch,
    { match: { params: { uid, token } } }
  ) => dispatch(
    actions.auth.password.change(uid, token, newPassword, newPasswordConfirm)
  ),
  validate: ({ newPassword, newPasswordConfirm }) => compose(
    !newPassword
      ? set('newPassword', 'Password is required')
      : newPassword.length < 8
        ? set('newPassword', 'Password is too short')
        : identity,
    !newPasswordConfirm ? set('newPasswordConfirm', 'Password confirmation is required') : identity,
    newPasswordConfirm && newPassword !== newPasswordConfirm
      ? set('newPassword', 'Password does not match the confirm password')
      : identity,
  )({}),
})(Change)
