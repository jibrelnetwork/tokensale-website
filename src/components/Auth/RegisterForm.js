// @flow

import React from 'react'
import { connect } from 'react-redux'
// import { lifecycle } from 'recompose'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'

import { JModalOpenButton } from '../Modals'
import { JText } from '../base'

import * as actions from '../../actions'
import { Input, Captcha } from '../common'

import { authCreateAccount } from '../../modules'

const VALIDATE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line max-len

type Props = {
  t: TFunction,
  submitting: boolean,
  handleSubmit: Function
}

const Register = ({ t, submitting, handleSubmit }: Props) => (
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
            className="button medium dark pull-left"
          >
            {!submitting && t('auth.registration.submit')}
          </button>
          <JModalOpenButton modalName="login" className="button medium transparent pull-right">
            <JText value="auth.registration.links.login" whiteSpace="wrap" />
          </JModalOpenButton>
        </div>
      </form>
    </div>
  </div>
)

const mapDispatchToProps = (dispatch: Function) => ({
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
      dispatch(authCreateAccount(email, password, passwordConfirm, captcha)),
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
