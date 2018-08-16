// @flow

import React from 'react'
// import cx from 'classnames'
// import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
// import { Redirect } from 'react-router-dom'

import Header from '../common/Header'
import * as Email from '../Auth/Email'
import * as AddressChange from '../AddressChange'
import R from '../../routes.yaml'

// type Props = {
//   isAuthorized: boolean,
//   isEmailConfirmed: boolean,
// }

// const ConfirmLayout = ({ isAuthorized, isEmailConfirmed }: Props) => (
const ConfirmLayout = () => (
  <div className="Verify inner-page">
    <div className="section start">
      <div className="inner">
        <Header activeLayout="misc" />
      </div>
    </div>
    <div className="section form">
      <div className="inner">
        <div className="auth">
          <Switch>
            {/* Email confirmation */}
            <Route {...R.VERIFY_EMAIL_SENDED} component={Email.Sended} />
            <Route {...R.VERIFY_EMAIL_PENDING} component={Email.Pending} />
            <Route {...R.VERIFY_EMAIL_VERIFIED} component={Email.Verified} />
            <Route {...R.VERIFY_EMAIL_DECLINED} component={Email.Declined} />
            {/* Address change */}
            <Route {...R.CONFIRM_ADDRESS_CHANGE} component={AddressChange.Request} />
            <Route {...R.CONFIRM_ADDRESS_CHANGE_SUCCESS} component={AddressChange.Success} />
            <Route {...R.CONFIRM_ADDRESS_CHANGE_FAIL} component={AddressChange.Fail} />
          </Switch>
        </div>
      </div>
    </div>
  </div>
)

// const mapStateToProps = (state) => ({
//   isAuthorized: !!state.auth.token,
//   isEmailConfirmed: state.account.isEmailConfirmed,
// })

// export default connect(
//   mapStateToProps,
// )(ConfirmLayout)

export default ConfirmLayout
