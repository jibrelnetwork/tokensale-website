import React from 'react'
// import { push } from 'react-router-redux'
import PropType from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'
import * as actions from '../../../actions'
import Input from '../../common/Input';

const UserInfo = ({ submitting, handleSubmit }) => (
  <div className="UserInfo">
    <form onSubmit={handleSubmit} className="form">
      <Field name="firstName" type="text" component={Input} label="First Name" />
      <Field name="lastName" type="text" component={Input} label="Last Name" />
      <Field name="birthday" type="text" component={Input} label="Birthday" />
      <Field name="residency" type="text" component={Input} label="Residency" />
      <Field name="citizenship" type="text" component={Input} label="Citizenship" />
      <div className="submit">
        <button type="submit" disabled={submitting}>Next Step</button>
      </div>
    </form>
  </div>
)

UserInfo.propTypes = {
  submitting: PropType.bool.isRequired,
  handleSubmit: PropType.func.isRequired,
}

export default reduxForm({
  form: 'register',
  onSubmit: ({ firstName, lastName, birthday, residency, citizenship }, dispatch) =>
    dispatch(actions.auth.register.updateUserInfo(firstName, lastName, birthday, residency, citizenship)),
  validate: (values) => compose(
    !values.firstName ? set('firstName', 'First name is required') : identity,
    !values.lastName ? set('lastName', 'Last name is required') : identity,
    !values.residency ? set('residency', 'Residency is required') : identity,
    !values.birthday ? set('birthday', 'Birthday is required') : identity,
    !values.citizenship ? set('citizenship', 'Citizenship is required') : identity,
  )({}),
  destroyOnUnmount: false,
})(UserInfo)
