import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'
import * as actions from '../../actions'
import { Input, Captcha } from '../common';

const Register = ({ submitting, handleSubmit }) => (
  <div className="Register">
    <div className="auth">
      <div className="form-block">
        <form onSubmit={handleSubmit} className="form">
          <Field name="email" type="text" component={Input} label="Email" />
          <Field name="password" type="password" component={Input} label="Password" />
          <Field name="passwordConfirm" type="password" component={Input} label="Password Confirmation" />
          <Field name="captcha" component={Captcha} />
          <div className="buttons clear">
            <button type="submit" disabled={submitting} className="button pull-left">Register</button>
            <Link to="/welcome/login" className="pull-right">Have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  </div>
)

Register.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'register',
  onSubmit: ({ email, password, passwordConfirm, captcha }, dispatch) => dispatch(
    actions.auth.register.createAccount(email, password, passwordConfirm, captcha)
  ),
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
    !values.passwordConfirm ? set('passwordConfirm', 'Password confirmation is required') : identity,
    values.passwordConfirm && values.password !== values.passwordConfirm
      ? set('password', 'Password does not match the confirm password')
      : identity,
    !values.captcha ? set('captcha', 'Click on captcha checkbox') : identity,
  )({}),
  destroyOnUnmount: false,
})(Register)
