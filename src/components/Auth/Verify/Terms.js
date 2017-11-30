import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'
import { translate, Interpolate } from 'react-i18next'

import { Input } from '../../common'
import * as actions from '../../../actions'

const Terms = ({ t, submitting, handleSubmit }) => (
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
          className="button bordered pull-right"
        >
          {!submitting && t('verification.terms.submit')}
        </button>
      </div>
    </form>
  </div>
)

Terms.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  form: `account-${state.auth.token}`,
})

export default compose(
  translate(),
  connect(mapStateToProps),
  reduxForm({
    onSubmit: (_, dispatch) => dispatch(actions.auth.verify.confirmTerms()),
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
