// @flow

import React from 'react'
// import cx from 'classnames'
import { connect } from 'react-redux'
// import { Route, Switch, Redirect } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import Tokens from '../Welcome/Tokens'
import Header from '../common/Header'
// import AuthHeader from '../common/AuthHeader'
import { Addresses, Transactions } from '../Account'
import Benefits from '../Welcome/Benefits'

import R from '../../routes.yaml'

type Props = {
  isAccountFetched: boolean,
  isAuthorized: boolean,
  isEmailConfirmed: boolean,
}

const AccountLayout = ({ isAccountFetched, isAuthorized, isEmailConfirmed }: Props) => (
  <div className="Account inner-page">
    { !isAuthorized && <Redirect to={R.ROOT.path} /> }
    { isAuthorized && isAccountFetched && !isEmailConfirmed && <Redirect to={R.VERIFY_EMAIL_SENDED.path} /> }
    <div className="section start">
      <div className="inner">
        <Header activeLayout="account" />
      </div>
    </div>
    <div className="section content">
      <div className="inner">
        <Addresses />
        <Transactions />
        <Tokens />
      </div>
    </div>
    <Benefits />
  </div>
)

const mapStateToProps = (state) => ({
  isAuthorized: !!state.auth.token,
  isAccountFetched: state.account.isAccountFetched,
  isEmailConfirmed: state.account.isEmailConfirmed,
})

export default connect(
  mapStateToProps,
)(AccountLayout)
