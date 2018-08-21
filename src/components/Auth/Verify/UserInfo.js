// @flow

import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import { set, identity, compose } from 'lodash/fp'
import { Redirect } from 'react-router-dom'

import { Input, Select, DateInput, Button } from '../../common'
import { COUNTRIES } from '../../../data/countries'

import R from '../../../routes.yaml'
import { accountUpdateUserInfo } from '../../../modules'
import type { State } from '../../../modules'

type Props = {
  t: TFunction,
  submitting: boolean,
  handleSubmit: Function,
  verifyStage: VerificationStage,
  userInfo: {
    firstName: string,
    lastName: string,
    birthday: string,
    residency: string,
    citizenship: string,
  }
}

const UserInfo = ({ submitting, handleSubmit, t, userInfo, verifyStage }: Props) => (
  <div className="UserInfo">
    { verifyStage === 'terms' && <Redirect to={R.VERIFY_TERMS.path} /> }
    <form onSubmit={handleSubmit} className="form">
      <Field
        name="firstName"
        defaultValue={userInfo.firstName}
        type="text"
        label={t('verification.userInfo.fields.firstName')}
        component={Input}
      />
      <Field
        name="lastName"
        defaultValue={userInfo.lastName}
        type="text"
        label={t('verification.userInfo.fields.lastName')}
        component={Input}
      />
      <Field
        name="birthday"
        defaultValue={userInfo.birthday}
        type="date"
        label={t('verification.userInfo.fields.birthday')}
        component={DateInput}
      />
      <Field
        name="residency"
        defaultValue={userInfo.residency}
        label={t('verification.userInfo.fields.residency')}
        options={COUNTRIES}
        component={Select}
      />
      <Field
        name="citizenship"
        defaultValue={userInfo.citizenship}
        label={t('verification.userInfo.fields.citizenship')}
        options={COUNTRIES}
        component={Select}
      />
      <div className="buttons clear">
        <Button
          type="submit"
          disabled={submitting}
          className="pull-right"
          value="verification.userInfo.submit"
        />
      </div>
    </form>
  </div>
)

const mapStateToProps = (state: State) => ({
  userInfo: {
    firstName: state.account.firstName,
    lastName: state.account.lastName,
    birthday: state.account.birthday,
    residency: state.account.residency,
    citizenship: state.account.citizenship,
  },
  verifyStage: state.account.verifyStage,
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
    destroyOnUnmount: true,
  })
)(UserInfo)
