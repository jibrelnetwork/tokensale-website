import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'

import Controls from './Controls'

const Header = ({ isSupportLinkShown }) => (
  <div className="header clear">
    <Link to="/welcome" className="logo pull-left scroll">
      <img src="/static/logo.svg" alt="" />
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
            className={cx('support-link', { show: isSupportLinkShown })}
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

Header.propTypes = {
  isSupportLinkShown: PropTypes.bool.isRequired,
}

export default Header
