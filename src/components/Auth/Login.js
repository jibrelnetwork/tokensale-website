import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'
import * as actions from '../../actions'
import { Input } from '../common'

const Login = ({ submitting, handleSubmit }) => (
  <div className="Login">
    <div className="auth">
      <div className="form-block">
        <form onSubmit={handleSubmit} className="form">
          <Field name="email" type="text" component={Input} label="Email" />
          <Field name="password" type="password" component={Input} label="Password" />
          <div className="buttons clear">
            <button type="submit" disabled={submitting} className="button pull-left">{!submitting && 'Login'}</button>
            <Link to="/reset-password" className="pull-right">Forgotten password?</Link>
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
      : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
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
