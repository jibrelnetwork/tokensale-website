import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { set, identity, compose } from 'lodash/fp'
import { Input, Select, DateInput } from '../../common'
import { COUNTRIES } from '../../../data/countries'
import * as actions from '../../../actions'

const UserInfo = ({ submitting, handleSubmit }) => (
  <div className="UserInfo">
    <form onSubmit={handleSubmit} className="form">
      <Field name="firstName" type="text" component={Input} label="First Name" />
      <Field name="lastName" type="text" component={Input} label="Last Name" />
      <Field name="birthday" type="date" component={DateInput} label="Birthday DD/MM/YYYY" />
      <Field name="residency" options={COUNTRIES} component={Select} label="Residency" />
      <Field name="citizenship" options={COUNTRIES} component={Select} label="Citizenship" />
      <div className="buttons clear">
        <button
          type="submit"
          className="button bordered pull-right"
          disabled={submitting}
        >
          {!submitting && 'Next Step'}
        </button>
      </div>
    </form>
  </div>
)

UserInfo.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  form: `account-${state.auth.token}`,
})

export default compose(
  connect(mapStateToProps),
  reduxForm({
    onSubmit: ({ firstName, lastName, birthday, residency, citizenship }, dispatch) =>
      dispatch(actions.auth.verify.updateUserInfo(firstName, lastName, birthday, residency, citizenship)),
    validate: (values) => compose(
      !values.lastName ? set('lastName', 'Last name is required') : identity,
      !values.birthday ? set('birthday', 'Birthday is required') : identity,
      !values.firstName ? set('firstName', 'First name is required') : identity,
      !values.residency ? set('residency', 'Residency is required') : identity,
      !values.citizenship ? set('citizenship', 'Citizenship is required') : identity,
    )({}),
    destroyOnUnmount: false,
  })
)(UserInfo)
