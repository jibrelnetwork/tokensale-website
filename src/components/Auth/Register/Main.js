import React from 'react'
// import { push } from 'react-router-redux'
import PropType from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'
import * as actions from '../../../actions'
import Input from '../../common/Input';

const Main = ({ submitting, handleSubmit }) => (
  <div className="Main">
    <form onSubmit={handleSubmit} className="form">
      <Field name="email" type="email" component={Input} label="Email" />
      <Field name="password" type="password" component={Input} label="Password" />
      <Field name="passwordConfirm" type="password" component={Input} label="Password Confirmation" />
      <div className="submit">
        <button type="submit" disabled={submitting}>Next Step</button>
      </div>
    </form>
  </div>
)

Main.propTypes = {
  submitting: PropType.bool.isRequired,
  handleSubmit: PropType.func.isRequired,
}

export default reduxForm({
  form: 'register',
  onSubmit: ({ email, password, passwordConfirm }, dispatch) => dispatch(
    actions.auth.register.createAccount(email, password, passwordConfirm)
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
  )({}),
  destroyOnUnmount: false,
})(Main)
