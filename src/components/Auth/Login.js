import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'
import * as actions from '../../actions'
import { Input } from '../common'

const VALIDATE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line max-len

const Login = ({ submitting, handleSubmit }) => (
  <div className="Login">
    <div className="auth">
      <div className="form-block">
        <form onSubmit={handleSubmit} className="form">
          <Field name="email" type="text" component={Input} label="Email" />
          <Field name="password" type="password" component={Input} label="Password" />
          <div className="buttons clear">
            <button type="submit" disabled={submitting} className="button pull-left">
              {!submitting && 'Login'}
            </button>
            <Link to="/welcome/password/reset" className="pull-right">Forgotten password?</Link>
          </div>
        </form>
      </div>
    </div>
  </div>
)

Login.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'login',
  onSubmit: ({ email, password }, dispatch) => dispatch(actions.auth.login(email, password)),
  validate: (values) => compose(
    !values.email
      ? set('email', 'Email address is required')
      : !VALIDATE_EMAIL_REGEXP.test(values.email)
        ? set('email', 'Invalid email address')
        : identity,
    !values.password
      ? set('password', 'Password is required')
      : values.password.length < 8
        ? set('password', 'Password is too short')
        : identity,
  )({}),
  destroyOnUnmount: true,
})(Login)
