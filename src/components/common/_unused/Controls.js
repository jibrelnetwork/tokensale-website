import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withHandlers, withState } from 'recompose'

function isTouchDevice() {
  return ('ontouchstart' in window) || navigator.maxTouchPoints
}

const Controls = ({
  t,
  email,
  isMenuOpen,
  isVerified,
  isAuthorized,
  openDashboard,
  isDashboardOpen,
  toggleMenuOrDashboard,
}) => (
  <div className="Controls">
    <ul className={cx('menu pull-right', { 'menu-active': isMenuOpen })}>
      {isAuthorized ? isVerified ? ([
        <li key="0"><Link to="/account">{t('index.header.account')}</Link></li>,
        <li key="1" className="bordered">
          <button onClick={openDashboard} className="button arrow">{email}</button>
        </li>,
      ]) : ([
        <li key="0"><Link to="/verify">{t('index.header.verification')}</Link></li>,
        <li key="1" className="bordered">
          <button onClick={openDashboard} className="button arrow">{email}</button>
        </li>,
      ]) : ([
        <li key="0">
          <a href="https://jibrel.network" target={`${isTouchDevice() ? '_self' : '_blank'}`}>
            {t('index.header.about')}
          </a>
        </li>,
        /* <li key="1">
          <a href="#" onClick={(e) => { openLoginModal(); e.preventDefault() }}>{t('index.header.login')}</a>
        </li>,
        <li key="2">
          <a
            href="#"
            onClick={(e) => { openRegisterModal(); e.preventDefault() }}
            className="button small"
          >
            {t('index.header.registration')}
          </a>
        </li>,
         <li key="1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://jibrelnetwork.freshdesk.com/support/tickets/new"
          >
            Support
          </a>
        </li>,
        <li key="2" className="bordered">
          <Link to="/welcome/login">{t('index.header.login')}</Link>
        </li>, */
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
  t: PropTypes.func.isRequired,
  email: PropTypes.string,
  isMenuOpen: PropTypes.bool.isRequired,
  isVerified: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  openDashboard: PropTypes.func.isRequired,
  isDashboardOpen: PropTypes.bool.isRequired,
  toggleMenuOrDashboard: PropTypes.func.isRequired,
}

Controls.defaultProps = {
  email: '...',
}

const mapStateToProps = (state) => ({
  email: state.account.dashboard.accountData.email,
  isVerified: !!state.auth.verifyStatus,
  isAuthorized: !!state.auth.token,
  isDashboardOpen: state.dashboardIsOpen,
})

const mapDispatchToProps = {
  openDashboard: actions.account.dashboard.toggle(),
}

export default compose(
  translate(),
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
