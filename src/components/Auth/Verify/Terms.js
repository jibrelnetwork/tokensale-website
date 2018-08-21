// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'
import { Redirect } from 'react-router-dom'

import { translate, Interpolate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import { Input, Button } from '../../common'

import { accountVerifyTermsConfirm } from '../../../modules'
import R from '../../../routes.yaml'

type Props = {
  t: TFunction,
  submitting: boolean,
  handleSubmit: Function,
  verifyStage: VerificationStage,
}

const Terms = ({ t, submitting, handleSubmit, verifyStage }: Props) => (
  <div className="Terms">
    { verifyStage !== 'terms' && <Redirect to={R.VERIFY_USER_INFO.path} />}
    <form onSubmit={handleSubmit} className="form">
      <Field
        name="policyConfirm"
        type="checkbox"
        label={
          <Interpolate
            i18nKey="verification.terms.fields.policyConfirm"
            link={(
              <a
                href={t('verification.terms.link.source')}
                target="_blank"
                className="terms-link"
              >
                {t('verification.terms.link.text')}
              </a>
            )}
          />
        }
        component={Input}
      />
      <Field
        name="citizenshipConfirm"
        type="checkbox"
        label={t('verification.terms.fields.citizenshipConfirm')}
        component={Input}
      />
      <div className="buttons clear">
        <Button
          type="submit"
          disabled={submitting}
          className="pull-right"
          value="verification.terms.submit"
        />
      </div>
    </form>
  </div>
)

const mapStateToProps = (state) => ({
  verifyStage: state.account.verifyStage,
})

export default compose(
  translate(),
  connect(
    mapStateToProps
  ),
  reduxForm({
    form: 'account-verification-terms-form',
    onSubmit: (_, dispatch) => dispatch(accountVerifyTermsConfirm()),
    validate: (values, props) => compose(
      !values.policyConfirm
        ? set('policyConfirm', props.t('verification.terms.errors.policyConfirm.isRequired'))
        : identity,
      !values.citizenshipConfirm
        ? set('citizenshipConfirm', props.t('verification.terms.errors.citizenshipConfirm.isRequired'))
        : identity,
    )({}),
    destroyOnUnmount: true,
  })
)(Terms)
