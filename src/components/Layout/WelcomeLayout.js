// @flow

import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
// import { Route, Switch, Redirect } from 'react-router-dom'

// import * as Auth from '../Auth'
import Header from '../common/Header'
import Content from '../Welcome/Content'
import Benefits from '../Welcome/Benefits'
import Tokens from '../Welcome/Tokens'
import Suisse from '../Welcome/Suisse'
import { Social } from '../common'

import type { State } from '../../modules'

const WelcomeLayout = () => (
  <div className="Welcome">
    <div className={cx('section', 'start', 'home')}>
      <div className="inner">
        <Header />
        <Content />
        <Tokens />
      </div>
    </div>
    <Benefits />
    <Suisse />
    <Social />
  </div>
)

const mapStateToProps = (state: State) => ({
  // isAuthorized: !!state.auth.token,
  isSupportLinkShown: state.auth.isSupportLinkShown,
})

export default connect(
  mapStateToProps,
  null
)(WelcomeLayout)
