// @flow

import React from 'react'
// import cx from 'classnames'
import { connect } from 'react-redux'
// import { Route, Switch, Redirect } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import Header from '../common/Header'
import Email from '../Auth/Email'
import R from '../../routes.yaml'

type Props = {
  isAuthorized: boolean,
  isEmailConfirmed: boolean,
}

const EmailVerifyLayout = ({ isAuthorized, isEmailConfirmed }: Props) => (
  <div className="Verify inner-page">
    { /* when user is logged in and email is confirmed -> verification page */ }
    { isAuthorized && isEmailConfirmed && <Redirect to={R.VERIFY.path} /> }
    <div className="section start">
      <div className="inner">
        <Header />
      </div>
    </div>
    <div className="section form">
      <div className="inner">
        <Email />
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  isAuthorized: !!state.auth.token,
  isEmailConfirmed: state.account.isEmailConfirmed,
})

export default connect(
  mapStateToProps,
)(EmailVerifyLayout)
