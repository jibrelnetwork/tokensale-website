import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { set, get, compose, identity } from 'lodash/fp'
import { Field, reduxForm, getFormSubmitErrors, getFormValues } from 'redux-form'

import * as actions from '../../actions'
import { Input } from '../common'

const VALIDATE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line max-len

const Login = ({
  t,
  email,
  submitting,
  resendEmail,
  handleSubmit,
  isEmailNotVerified,
}) => (
  <div className="auth">
    <div className="form-block">
      <form
        onSubmit={handleSubmit}
        className="form"
      >
        <Field
          name="email"
          type="text"
          label={t('auth.login.fields.email')}
          component={Input}
        />
        <Field
          name="password"
          type="password"
          label={t('auth.login.fields.password')}
          component={Input}
        />
        <div className="buttons clear">
          <button
            type="submit"
            disabled={submitting}
            className="button pull-left"
          >
            {!submitting && 'Login'}
          </button>
          {isEmailNotVerified ? (
            <div
              style={{ padding: 0 }}
              onClick={() => resendEmail(email)}
              className="button clean pull-right"
            >
              {t('auth.login.links.resendEmail')}
            </div>
          ) : (
            <Link
              to="/welcome/password/reset"
              className="pull-right"
            >
              {t('auth.login.links.resetPassword')}
            </Link>
          )}
        </div>
      </form>
    </div>
  </div>
)

Login.propTypes = {
  t: PropTypes.func.isRequired,
  email: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  resendEmail: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEmailNotVerified: PropTypes.bool.isRequired,
}

Login.defaultProps = {
  email: undefined,
}

const mapStateToProps = (state) => ({
  isEmailNotVerified: get(
    ['password', 0],
    getFormSubmitErrors('login')(state)
  ) === 'E-mail is not verified.', // ! works only in English API locale
  email: get('email', getFormValues('login')(state)),
})

const mapDispatchToProps = {
  resendEmail: actions.auth.email.resend,
  showSupportLink: actions.auth.showSupportLink,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    form: 'login',
    onSubmit: ({ email, password }, dispatch) =>
      dispatch(actions.auth.login(email, password)),
    validate: ({ email, password }, { t }) => compose(
      !email
        ? set('email', t('auth.login.errors.email.isRequired'))
        : !VALIDATE_EMAIL_REGEXP.test(email)
          ? set('email', t('auth.login.errors.email.isRequired'))
          : identity,
      !password
        ? set('password', t('auth.login.errors.password.isRequired'))
        : password.length < 8
          ? set('password', t('auth.login.errors.password.isTooShort'))
          : identity,
    )({}),
    destroyOnUnmount: true,
  }),
  lifecycle({
    componentWillReceiveProps(props) {
      if (props.submitFailed) {
        props.showSupportLink()
      }
    },
    componentWillUnmount() {
      this.props.showSupportLink(false) // eslint-disable-line fp/no-this
    },
  }),
)(Login)
