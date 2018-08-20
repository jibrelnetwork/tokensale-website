// @flow

import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import { withHandlers, withState } from 'recompose'

import Dashboard from './Dashboard'

import { accountToggleDashboard, authLogout } from '../../../modules'
import { ModalOpenButton, Button } from '../../common'

function isTouchDevice(): boolean {
  return ('ontouchstart' in window) || navigator.maxTouchPoints > 0
}

type Props = {
  t: TFunction,
  email: ?string,

  isMenuOpen: boolean,
  isVerified: boolean,
  isAuthorized: boolean,
  // isDashboardOpen: boolean,
  isEmailConfirmed: boolean,

  openDashboard: Function,
  // toggleMenuOrDashboard: Function,
  onLogoutClick: Function,
  activeLayout?: ActiveLayout,
}

const Controls = ({
  t,
  email,
  isMenuOpen,
  isVerified,
  isAuthorized,
  isEmailConfirmed,
  openDashboard,
  // isDashboardOpen,
  // toggleMenuOrDashboard,
  onLogoutClick,
  activeLayout,
}: Props) => (
  <div className="Controls">
    <ul className={cx('menu pull-right', { 'menu-active': isMenuOpen })}>
      {isAuthorized ? isVerified ? (
        <React.Fragment>
          {activeLayout !== 'account' &&
            <li><Link className="button transparent" to="/account">{t('index.header.account')}</Link></li>}
          <li>
            <button onClick={openDashboard} className="button arrow transparent">{email}</button>
          </li>
        </React.Fragment>
      ) : (
        <React.Fragment>
          { isEmailConfirmed && <li><Link to="/verify">{t('index.header.verification')}</Link></li> }
          <li>
            <Button
              onClick={onLogoutClick}
              colorStyle="light"
              size="small"
              value="account.logout"
            />
          </li>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <li>
            <a href="https://jibrel.network" target={`${isTouchDevice() ? '_self' : '_blank'}`}>
              {t('index.header.about')}
            </a>
          </li>
          <li>
            <ModalOpenButton
              modalName="login"
              colorStyle="transparent"
              size="small"
              value="index.header.login"
            />
          </li>
          <li>
            <ModalOpenButton
              modalName="register"
              colorStyle="light"
              size="small"
              value="index.header.register"
            />
          </li>
          {/* <li key="1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://jibrelnetwork.freshdesk.com/support/tickets/new"
          >
            Support
          </a>
        </li>
        <li key="2" className="bordered">
          <Link to="/welcome/login">{t('index.header.login')}</Link>
        </li> */}
        </React.Fragment>)}
    </ul>
    {/* <button
      onClick={toggleMenuOrDashboard}
      className={cx('menu-button', 'pull-right', { active: isMenuOpen || isDashboardOpen })}
    >
      <span>Menu</span>
    </button> */}
    { isAuthorized && <Dashboard activeLayout={activeLayout} /> }
  </div>
)

Controls.defaultProps = {
  email: '',
  activeLayout: 'welcome',
}

const mapStateToProps = (state) => ({
  email: state.account.email,
  isVerified: !!state.account.verifyStatus,
  isEmailConfirmed: state.account.isEmailConfirmed,
  isAuthorized: !!state.auth.token,
  isDashboardOpen: state.account.dashboardIsOpen,
})

const mapDispatchToProps = {
  openDashboard: accountToggleDashboard,
  onLogoutClick: authLogout,
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
