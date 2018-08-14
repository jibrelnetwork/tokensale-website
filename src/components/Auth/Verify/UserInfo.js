import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import { set, identity, compose } from 'lodash/fp'

import { Input, Select, DateInput } from '../../common'
import { COUNTRIES } from '../../../data/countries'

import { accountUpdateUserInfo } from '../../../modules'

const UserInfo = ({ submitting, handleSubmit, t }) => (
  <div className="UserInfo">
    <form onSubmit={handleSubmit} className="form">
      <Field
        name="firstName"
        type="text"
        label={t('verification.userInfo.fields.firstName')}
        component={Input}
      />
      <Field
        name="lastName"
        type="text"
        label={t('verification.userInfo.fields.lastName')}
        component={Input}
      />
      <Field
        name="birthday"
        type="date"
        label={t('verification.userInfo.fields.birthday')}
        component={DateInput}
      />
      <Field
        name="residency"
        label={t('verification.userInfo.fields.residency')}
        options={COUNTRIES}
        component={Select}
      />
      <Field
        name="citizenship"
        label={t('verification.userInfo.fields.citizenship')}
        options={COUNTRIES}
        component={Select}
      />
      <div className="buttons clear">
        <button
          type="submit"
          disabled={submitting}
          className="button medium dark pull-right"
        >
          {!submitting && t('verification.userInfo.submit')}
        </button>
      </div>
    </form>
  </div>
)

UserInfo.propTypes = {
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
    form: 'account-verification-user-info-form',
    onSubmit: ({ firstName, lastName, birthday, residency, citizenship }, dispatch) =>
      dispatch(accountUpdateUserInfo(firstName, lastName, birthday, residency.value, citizenship.value)),
    validate: ({ lastName, birthday, firstName, residency, citizenship }, { t }) => compose(
      !lastName
        ? set('lastName', t('verification.userInfo.errors.lastName.isRequired'))
        : identity,
      !birthday
        ? set('birthday', t('verification.userInfo.errors.birthday.isRequired'))
        : identity,
      !firstName
        ? set('firstName', t('verification.userInfo.errors.firstName.isRequired'))
        : identity,
      !residency
        ? set('residency', t('verification.userInfo.errors.residency.isRequired'))
        : identity,
      !citizenship
        ? set('citizenship', t('verification.userInfo.errors.citizenship.isRequired'))
        : identity,
    )({}),
    destroyOnUnmount: false,
  })
)(UserInfo)
