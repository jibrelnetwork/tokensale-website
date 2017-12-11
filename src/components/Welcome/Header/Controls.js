import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { withHandlers, withState } from 'recompose'

import * as actions from '../../../actions'
import Dashboard from '../../common/Dashboard'

function isTouchDevice() {
  return ('ontouchstart' in window) || navigator.maxTouchPoints
}

const Controls = ({
  openDashboard,
  toggleMenuOrDashboard,
  email,
  isMenuOpen,
  isVerified,
  isAuthorized,
  isDashboardOpen,
}) => (
  <div className="Controls">
    <ul className={cx('menu pull-right', { 'menu-active': isMenuOpen })}>
      {isAuthorized ? isVerified ? ([
        <li key="0"><Link to="/account">Go to dashboard</Link></li>,
        <li key="1" className="bordered">
          <button onClick={openDashboard} className="button arrow">{email}</button>
        </li>,
      ]) : ([
        <li key="0"><Link to="/verify">Complete verification</Link></li>,
        <li key="1" className="bordered">
          <button onClick={openDashboard} className="button arrow">{email}</button>
        </li>,
      ]) : ([
        <li key="0">
          <a
            href="https://jibrel.network?from-sale=1"
            target={`${isTouchDevice() ? '_self' : '_blank'}`}
          >
            About Jibrel Network
          </a>
        </li>,
        <li key="1"><Link to="/welcome/register">Sign Up</Link></li>,
        <li key="2" className="bordered"><Link to="/welcome/login">Sign In</Link></li>,
      ])}
    </ul>
    <button
      onClick={toggleMenuOrDashboard}
      className={cx('menu-button', 'pull-right', { active: isMenuOpen || isDashboardOpen })}
    >
      <span>Menu</span>
    </button>
    {isAuthorized && <Dashboard isHomePage />}
  </div>
)

Controls.propTypes = {
  openDashboard: PropTypes.func.isRequired,
  toggleMenuOrDashboard: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  isVerified: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isDashboardOpen: PropTypes.bool.isRequired,
  /* optional */
  email: PropTypes.string,
}

Controls.defaultProps = {
  email: '...',
}

const mapStateToProps = (state) => ({
  email: state.account.dashboard.accountData.email,
  isVerified: !!state.auth.verifyStatus,
  isAuthorized: !!state.auth.token,
  isDashboardOpen: state.account.dashboard.isOpen,
})

const mapDispatchToProps = {
  openDashboard: actions.account.dashboard.toggle,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState(
    'isMenuOpen',
    'toggleMenu',
    false,
  ),
  withHandlers({
    toggleMenuOrDashboard: ({
      toggleMenu,
      openDashboard,
      isMenuOpen,
      isAuthorized,
    }) => () => isAuthorized ? openDashboard() : toggleMenu(!isMenuOpen),
  })
)(Controls)
