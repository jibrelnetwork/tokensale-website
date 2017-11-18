import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { set, identity, compose } from 'lodash/fp'
import { Input, Datepicker, Select } from '../../common';
import * as actions from '../../../actions'

const UserInfo = ({ submitting, handleSubmit }) => (
  <div className="UserInfo">
    <form onSubmit={handleSubmit} className="form">
      <Field name="firstName" type="text" component={Input} label="First Name" />
      <Field name="lastName" type="text" component={Input} label="Last Name" />
      <Field name="birthday" type="text" component={Datepicker} label="Birthday" />
      <Field name="residency" component={Select} label="Residency" />
      <Field name="citizenship" component={Select} label="Citizenship" />
      <div className="buttons clear">
        <button type="submit" className="button bordered pull-right" disabled={submitting}>Next Step</button>
      </div>
    </form>
  </div>
)

UserInfo.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default compose(
  connect((state, props) => ({ form: `form-${props.id}` })),
  reduxForm({
    onSubmit: ({ firstName, lastName, birthday, residency, citizenship }, dispatch) =>
      dispatch(actions.auth.verify.updateUserInfo(firstName, lastName, birthday, residency, citizenship)),
    validate: (values) => compose(
      !values.firstName ? set('firstName', 'First name is required') : identity,
      !values.lastName ? set('lastName', 'Last name is required') : identity,
      !values.residency ? set('residency', 'Residency is required') : identity,
      !values.birthday ? set('birthday', 'Birthday is required') : identity,
      !values.citizenship ? set('citizenship', 'Citizenship is required') : identity,
    )({}),
    destroyOnUnmount: false,
  })
)(UserInfo)
