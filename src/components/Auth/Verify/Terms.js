import React from 'react'
// import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'
import * as actions from '../../../actions'
import { Input } from '../../common';

const Terms = ({ submitting, handleSubmit }) => (
  <div className="Terms">
    <form onSubmit={handleSubmit} className="form">
      <Field name="policyConfirm" type="checkbox" component={Input} label="Policy text" />
      <Field name="citizenshipConfirm" type="checkbox" component={Input} label="Citizenship text" />
      <div className="submit">
        <button type="submit" disabled={submitting}>Next Step</button>
      </div>
    </form>
  </div>
)

Terms.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'account',
  onSubmit: (_, dispatch) => dispatch(actions.auth.verify.confirmTerms()),
  validate: (values) => compose(
    !values.policyConfirm ? set('policyConfirm', 'Policy agreement is required') : identity,
    !values.citizenshipConfirm ? set('citizenshipConfirm', 'Citizenship confirmation is required') : identity,
  )({}),
  destroyOnUnmount: false,
})(Terms)
