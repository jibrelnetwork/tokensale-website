import React from 'react'
import PropType from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'
import * as actions from '../../actions'
import { Input } from '../common';

const Login = ({ submitting, handleSubmit }) => (
  <div className="Login">
    <form onSubmit={handleSubmit} className="form">
      <Field name="email" type="email" component={Input} label="Email" />
      <Field name="password" type="password" component={Input} label="Password" />
      <div className="submit">
        <button type="submit" disabled={submitting}>Login</button>
      </div>
    </form>
  </div>
)

Login.propTypes = {
  submitting: PropType.bool.isRequired,
  handleSubmit: PropType.func.isRequired,
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
  destroyOnUnmount: false,
})(Login)
