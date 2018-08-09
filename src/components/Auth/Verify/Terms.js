// @flow

import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'

import { translate, Interpolate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import { Input } from '../../common'

import { accountVerifyTermsConfirm } from '../../../modules'

// import type { State } from '../../../modules'

type Props = {
  t: TFunction,
  submitting: Function,
  handleSubmit: Function,
}

const Terms = ({ t, submitting, handleSubmit }: Props) => (
  <div className="Terms">
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
        <button
          type="submit"
          disabled={submitting}
          className="button medium pull-right"
        >
          {!submitting && t('verification.terms.submit')}
        </button>
      </div>
    </form>
  </div>
)

export default compose(
  translate(),
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
    destroyOnUnmount: false,
  })
)(Terms)
