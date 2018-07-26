import React from 'react'
import { Link, Route } from 'react-router-dom'

import Controls from './Controls'

const Header = () => (
  <div className="header clear">
    <Link to="/welcome" className="logo pull-left scroll">
      <img src="/static/logo-kambio.svg" alt="" />
    </Link>
    <Route
      path="/welcome"
      exact
      component={Controls}
    />
    <Route
      path="/welcome/:modal"
      render={() => (
        <div className="header-links pull-right">
          <a
            className="support-link show"
            target="_blank"
            rel="noopener noreferrer"
            href="https://jibrelnetwork.freshdesk.com/support/tickets/new"
          >
            Support
          </a>
          <Link to="/welcome" className="close" />
        </div>
      )}
    />
  </div>
)

export default Header
