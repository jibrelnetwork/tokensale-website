import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'

import * as actions from '../../actions'
import { Input, Captcha } from '../common'

const VALIDATE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line max-len

const Register = ({ submitting, handleSubmit }) => (
  <div className="auth">
    <div className="form-block">
      <form onSubmit={handleSubmit} className="form">
        <Field name="email" type="text" component={Input} label="Email" />
        <Field name="password" type="password" component={Input} label="Password" />
        <Field
          name="passwordConfirm"
          type="password"
          component={Input}
          label="Password Confirmation"
        />
        <Field name="captcha" component={Captcha} />
        <div className="buttons clear">
          <button type="submit" disabled={submitting} className="button pull-left">
            {!submitting && 'Register'}
          </button>
          <Link to="/welcome/login" className="pull-right">Have an account?</Link>
        </div>
      </form>
    </div>
  </div>
)

Register.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  showSupportLink: actions.auth.showSupportLink,
}

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  reduxForm({
    form: 'register',
    onSubmit: ({ email, password, passwordConfirm, captcha }, dispatch) => dispatch(
      actions.auth.register.createAccount(email, password, passwordConfirm, captcha)
    ),
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
      !values.passwordConfirm
        ? set('passwordConfirm', 'Password confirmation is required')
        : identity,
      values.passwordConfirm && values.password !== values.passwordConfirm
        ? set('password', 'Password does not match the confirm password')
        : identity,
      !values.captcha ? set('captcha', 'Please complete captcha') : identity,
    )({}),
  }),
  lifecycle({
    componentWillReceiveProps(props) {
      if (props.submitFailed) {
        props.showSupportLink()
      }
    },
    componentWillUnmount() { this.props.showSupportLink(false) }, // eslint-disable-line fp/no-this
  }),
)(Register)
