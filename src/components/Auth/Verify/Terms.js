import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'
import * as actions from '../../../actions'
import { Input } from '../../common';

/* eslint-disable max-len */
const POLICY = 'I have read the Token Sale Terms & Conditions, Privacy Policy and Jibrel Network White Paper, and accept all terms, conditions, obligations, affirmations, representations and warranties outlined in these documents and agree to adhere to them and be legally bound by them'
const CITIZENSHIP = 'I confirm that I am not citizen, permanent resident, or granted indefinite leave to remain in the US, Singapore or China - or any jurisdiction in which the purchase of Jibrel Network Token (JNT) is explicitly prohibited or outlawed.'
/* eslint-enable */

const Terms = ({ submitting, handleSubmit }) => (
  <div className="Terms">
    <form onSubmit={handleSubmit} className="form">
      <Field
        name="policyConfirm"
        type="checkbox"
        label={POLICY}
        component={Input}
      />
      <Field
        name="citizenshipConfirm"
        type="checkbox"
        label={CITIZENSHIP}
        component={Input}
      />
      <div className="buttons clear">
        <button
          type="submit"
          disabled={submitting}
          className="button bordered pull-right"
        >
          Next Step
        </button>
      </div>
    </form>
  </div>
)

Terms.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  form: `account-${state.auth.token}`,
})

export default compose(
  connect(mapStateToProps),
  reduxForm({
    onSubmit: (_, dispatch) => dispatch(actions.auth.verify.confirmTerms()),
    validate: (values) => compose(
      !values.policyConfirm ? set('policyConfirm', 'Policy agreement confirm is required') : identity,
      !values.citizenshipConfirm ? set('citizenshipConfirm', 'Citizenship confirmation is required') : identity,
    )({}),
    destroyOnUnmount: false,
  })
)(Terms)
