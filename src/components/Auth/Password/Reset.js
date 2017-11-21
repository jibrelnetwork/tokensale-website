import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../../actions'
import { Input } from '../../common'

const Change = ({ submitting, handleSubmit }) => (
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

Change.propTypes = {
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
    : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
      ? { email: 'Invalid email address' }
      : {},
})(Change)
