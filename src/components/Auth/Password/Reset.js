import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../../actions'
import { Input } from '../../common'

const VALIDATE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line max-len

const Reset = ({ submitting, handleSubmit }) => (
  <div className="Change">
    <div className="auth">
      <div className="form-block">
        <form onSubmit={handleSubmit} className="form">
          <Field
            name="email"
            type="text"
            label="Your email"
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
    </div>
  </div>
)

Reset.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'reset-password',
  onSubmit: ({ email }, dispatch) => dispatch(
    actions.auth.password.reset(email)
  ),
  validate: ({ email }) => !email
    ? { email: 'Email address is required' }
    : !VALIDATE_EMAIL_REGEXP.test(email)
      ? { email: 'Invalid email address' }
      : {},
})(Reset)
