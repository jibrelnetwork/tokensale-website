// @flow

import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import Dashboard from './Dashboard'

import { toggleDashboard, authLogout } from '../../../modules'
import { ModalOpenButton, Button } from '../../common'

import { links } from '../../../config'

function isTouchDevice(): boolean {
  return ('ontouchstart' in window) || navigator.maxTouchPoints > 0
}

type Props = {
  t: TFunction,
  email: ?string,

  isVerified: boolean,
  // verifyStatus: VerificationStatus,
  isAuthorized: boolean,
  isDashboardOpen: boolean,
  isEmailConfirmed: boolean,

  openDashboard: Function,
  onLogoutClick: Function,
  activeLayout?: ActiveLayout,
}

const Controls = ({
  t,
  email,
  isVerified,
  isAuthorized,
  isEmailConfirmed,
  openDashboard,
  isDashboardOpen,
  onLogoutClick,
  activeLayout,
  // verifyStatus,
}: Props) => (
  <div className="Controls">
    <ul className={cx('menu pull-right')}>
      {isAuthorized ? isVerified ? (
        <React.Fragment>
          {/* {(['Pending', 'Declined'].includes(verifyStatus)) &&
            <li><Link className="button transparent" to="/verify">Complete verification</Link></li>}
          {activeLayout !== 'account' &&
            <li><Link className="button transparent" to="/account">{t('index.header.account')}</Link></li>} */}
          <li>
            <button onClick={openDashboard} className="button arrow transparent">{email}</button>
          </li>
        </React.Fragment>
      ) : (
        <React.Fragment>
          { !isEmailConfirmed && <li><Link to="/confirm/email">{t('index.header.verification')}</Link></li> }
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
            <a
              className="button medium transparent"
              href={links.icoHomeLink}
              target={`${isTouchDevice() ? '_self' : '_blank'}`}
            >
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
        </React.Fragment>)}
    </ul>
    <button
      onClick={openDashboard}
      className={cx('menu-button', 'pull-right', { active: isDashboardOpen })}
    >
      <span>Menu</span>
    </button>
    <Dashboard activeLayout={activeLayout} />
  </div>
)

Controls.defaultProps = {
  activeLayout: 'welcome',
}

const mapStateToProps = (state) => ({
  email: state.account.email,
  isVerified: !!state.account.verifyStatus,
  // verifyStatus: state.account.verifyStatus, // eslint-disable-line more/no-duplicated-chains
  isEmailConfirmed: state.account.isEmailConfirmed,
  isAuthorized: !!state.auth.token,
  isDashboardOpen: state.appearance.dashboardIsOpen,
})

const mapDispatchToProps = {
  openDashboard: toggleDashboard,
  onLogoutClick: authLogout,
}

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(Controls)
