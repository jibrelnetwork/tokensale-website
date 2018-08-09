// @flow

import React from 'react'

import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { translate } from 'react-i18next'
import { set, get, compose, identity } from 'lodash/fp'
import { Field, reduxForm, getFormSubmitErrors, getFormValues } from 'redux-form'

import { JModalOpenButton } from '../Modals'
import { JText } from '../base'

/* ::
import type { TFunction } from 'react-i18next'
import type { State } from '../../modules'
*/

import * as actions from '../../actions'
import { Input, Captcha } from '../common'

import { authLogin } from '../../modules'

const VALIDATE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line max-len

type Props = {
  t: TFunction,
  email: ?string,
  submitting: boolean,
  isEmailNotVerified: boolean,
  resendEmail: Function,
  handleSubmit: Function,
}

const Login = ({
  t,
  email,
  submitting,
  resendEmail,
  handleSubmit,
  isEmailNotVerified,
}: Props) => (
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
        <Field name="captcha" component={Captcha} />
        <div className="buttons clear">
          <button
            type="submit"
            disabled={submitting}
            className="button medium pull-left"
          >
            {!submitting && t('auth.login.submit')}
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
            <JModalOpenButton modalName="resetPasswordEmail" className="pull-right">
              <JText value="auth.login.links.resetPassword" whiteSpace="wrap" />
            </JModalOpenButton>
          )}
        </div>
      </form>
    </div>
  </div>
)

Login.defaultProps = {
  email: undefined,
}

const mapStateToProps = (state: State) => ({
  isEmailNotVerified: get(
    ['password', 0],
    getFormSubmitErrors('login')(state)
  ) === 'E-mail is not verified.', // ! works only in English API locale
  email: get('email', getFormValues('login')(state)),
})

const mapDispatchToProps = (dispatch: Function) => ({
  resendEmail: (email) => dispatch(actions.auth.email.resend(email)),
  showSupportLink: () => dispatch(actions.auth.showSupportLink()),
})

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    form: 'login',
    onSubmit: ({ email, password, captcha }, dispatch) => dispatch(authLogin(email, password, captcha)),
    validate: ({ email, password, captcha }, { t }) => compose(
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
      !captcha
        ? set('captcha', t('auth.login.errors.captcha.isRequired'))
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
