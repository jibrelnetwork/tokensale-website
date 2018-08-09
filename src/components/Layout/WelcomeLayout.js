// @flow

import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
// import { Route, Switch, Redirect } from 'react-router-dom'

// import * as Auth from '../Auth'
import Header from '../common/Header'
import Content from '../Welcome/Content'
import Benefits from '../Welcome/Benefits'
import Suisse from '../Welcome/Suisse'
import { Social } from '../common'

const WelcomeLayout = () => (
  <div className="Welcome">
    <div className={cx('section', 'start', 'home')}>
      <div className="inner">
        <Header />
        <Content />
      </div>
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
)(WelcomeLayout)
