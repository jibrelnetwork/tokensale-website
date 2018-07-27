import React from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { lifecycle } from 'recompose'
import { translate } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'

import * as actions from '../../actions'
import { Input, Captcha } from '../common'

const VALIDATE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line max-len

const Register = ({ submitting, handleSubmit, t, openLoginModal }) => (
  <div className="auth">
    <div className="form-block">
      <form onSubmit={handleSubmit} className="form">
        <Field
          name="email"
          type="text"
          label={t('auth.registration.fields.email')}
          component={Input}
        />
        <Field
          name="password"
          type="password"
          label={t('auth.registration.fields.password')}
          component={Input}
        />
        <Field
          name="passwordConfirm"
          type="password"
          label={t('auth.registration.fields.passwordConfirm')}
          component={Input}
        />
        <Field
          name="captcha"
          component={Captcha}
        />
        <div className="buttons clear">
          <button
            type="submit"
            disabled={submitting}
            className="button medium pull-left"
          >
            {!submitting && t('auth.registration.submit')}
          </button>
          <a
            href="#"
            className="pull-right"
            onClick={(e) => { openLoginModal(e); e.preventDefault() }}
          >
            {t('auth.registration.links.login')}
          </a>
        </div>
      </form>
    </div>
  </div>
)

Register.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  openLoginModal: () => {
    dispatch(actions.account.modals.changeState('loginModal', 'open'))
    dispatch(actions.account.modals.changeState('registerModal', 'close'))
  },
})

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps,
  ),
  reduxForm({
    form: 'register',
    onSubmit: ({ email, password, passwordConfirm, captcha }, dispatch) =>
      dispatch(actions.auth.register.createAccount(email, password, passwordConfirm, captcha)),
    validate: ({ email, password, passwordConfirm, captcha }, { t }) => compose(
      !email
        ? set('email', t('auth.registration.errors.email.isRequired'))
        : !VALIDATE_EMAIL_REGEXP.test(email)
          ? set('email', t('auth.registration.errors.email.isInvalid'))
          : identity,
      !password
        ? set('password', t('auth.registration.errors.password.isRequired'))
        : password.length < 8
          ? set('password', t('auth.registration.errors.password.isTooShort'))
          : identity,
      !passwordConfirm
        ? set('passwordConfirm', t('auth.registration.errors.passwordConfirm.isRequired'))
        : identity,
      passwordConfirm && password !== passwordConfirm
        ? set('passwordConfirm', t('auth.registration.errors.passwordConfirm.notMatch'))
        : identity,
      !captcha
        ? set('captcha', t('auth.registration.errors.captcha.isRequired'))
        : identity,
    )({}),
  }),
  // lifecycle({
  //   componentWillReceiveProps(props) {
  //     if (props.submitFailed) {
  //       props.showSupportLink()
  //     }
  //   },
  //   componentWillUnmount() {
  //     this.props.showSupportLink(false) // eslint-disable-line fp/no-this
  //   },
  // }),
)(Register)
