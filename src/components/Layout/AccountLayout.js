// @flow

import React from 'react'
// import cx from 'classnames'
import { connect } from 'react-redux'
// import { Route, Switch, Redirect } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import Header from '../common/Header'
// import AuthHeader from '../common/AuthHeader'
import { Addresses, Transactions } from '../Account'
import Benefits from '../Welcome/Benefits'
import Social from '../common/Social'

import R from '../../routes.yaml'
import type { VerificationStatus } from '../../modules/account'

type Props = {
  isAuthorized: boolean,
  isEmailConfirmed: boolean,
  verifyStatus: VerificationStatus,
}

const AccountLayout = ({ isAuthorized, isEmailConfirmed, verifyStatus }: Props) => (
  <div className="Account inner-page">
    { /* when user is logged in and email is confirmed -> verification page */ }
    { !(isAuthorized && isEmailConfirmed && verifyStatus) && <Redirect to={R.VERIFY.path} /> }
    <div className="section start">
      <div className="inner">
        <Header />
      </div>
    </div>
    <div className="section content">
      <div className="inner">
        <Addresses />
        <Transactions />
      </div>
    </div>
    <Benefits />
    <Social />
  </div>
)

const mapStateToProps = (state) => ({
  isAuthorized: !!state.auth.token,
  isEmailConfirmed: state.account.isEmailConfirmed,
  verifyStatus: state.account.verifyStatus,
})

export default connect(
  mapStateToProps,
)(AccountLayout)
