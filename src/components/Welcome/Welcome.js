// @flow

import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
// import { Route, Switch, Redirect } from 'react-router-dom'

// import * as Auth from '../Auth'
import Header from './Header'
import Content from './Content'
import Benefits from './Benefits'
import Suisse from './Suisse'
import { Social } from '../common'

// import ConfirmWithdraw from './ConfirmWithdraw'
// import ConfirmAddressChange from './ConfirmAddressChange'

// const HOME_PAGE_PATHNAME = '/welcome'
// const EMAIL_SENDED_PAGE_PATHNAME = '/welcome/email/sended'

// function getPageName(pathname) {
//   switch (pathname) {
//     case HOME_PAGE_PATHNAME:
//       return 'home'
//     case EMAIL_SENDED_PAGE_PATHNAME:
//       return 'email-sended'
//     default:
//       return ''
//   }
// }

const Welcome = () => (
  <div className="Welcome">
    <div className={cx('section', 'start', 'home')}>
      <div className="inner">
        <Header />
        <Content />
      </div>
      {/* <Switch>
        <Route
          component={ConfirmWithdraw}
          path="/welcome/withdraw-confirm/"
        />
        <Route
          component={ConfirmAddressChange}
          path="/welcome/change-address-confirm/"
        />
        <Redirect from="/welcome/:not_found" to="/welcome" />
      </Switch> */}
    </div>
    <Benefits />
    <Suisse />
    <Social />
  </div>
)

const mapStateToProps = (state) => ({
  // isAuthorized: !!state.auth.token,
  isSupportLinkShown: state.auth.isSupportLinkShown,
})

export default connect(
  mapStateToProps,
)(Welcome)

