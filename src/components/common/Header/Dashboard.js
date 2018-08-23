// @flow

import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { translate, Interpolate } from 'react-i18next'
import type { TFunction } from 'react-i18next'
// import { withState } from 'recompose'

import {
  toggleDashboard,
  authLogout,
  showModal,
} from '../../../modules'

import { links } from '../../../config'

// function toggleDropdown(handler, isOpen) {
//   return () => handler(!isOpen)
// }

function isTouchDevice() {
  return ('ontouchstart' in window) || navigator.maxTouchPoints
}

type Props = {
  t: TFunction,
  isAuthorized: boolean,
  openLoginModal: Function,
  openRegisterModal: Function,
  closeDashboard: Function,
  openSetAddressModal: Function,
  openKYCStatusModal: Function,
  openChangePasswordModal: Function,
  logout: Function,
  accountData: {
    firstName: string,
    lastName: string,
  },
  isOpen: boolean,
  verifyStatus: VerificationStatus,
  activeLayout: ActiveLayout,
}

const Dashboard = ({
  t,
  isOpen,
  isAuthorized,
  openLoginModal,
  openRegisterModal,

  closeDashboard,
  openSetAddressModal,
  openKYCStatusModal,
  logout,
  openChangePasswordModal,
  accountData,
  verifyStatus,

  activeLayout,
}: Props) => (
  <div onClick={closeDashboard} className={cx('dashboard', { open: isOpen })}>
    <div className="overlay" />
    <div className="content">
      {!isAuthorized &&
        <div className="body">
          {/* About link */}
          <div className="item">
            <a
              className="title"
              href={links.icoHomePageLink}
              target={`${isTouchDevice() ? '_self' : '_blank'}`}
            >
              {t('index.header.about')}
            </a>
          </div>
          {/* Open login modal */}
          <div className="item">
            <div
              onClick={openLoginModal}
              className="title"
            >
              {t('index.header.login')}
            </div>
          </div>
          {/* Registartion */}
          <div className="item">
            <div
              onClick={openRegisterModal}
              className="title"
            >
              {t('index.header.register')}
            </div>
          </div>
        </div>
      }
      {isAuthorized &&
        <React.Fragment>
          {!!verifyStatus && (
            <div className="head">
              <div className="name">
                {`${accountData.firstName || '...'} ${accountData.lastName || '...'}`}
              </div>
              <div className="status">
                <Interpolate
                  i18nKey="account.KYCStatus.label"
                  status={t(`account.KYCStatus.variants.${verifyStatus.toLowerCase()}`)}
                />
              </div>
              <div onClick={openKYCStatusModal} className="status-info" />
            </div>
          )}
          <div className="body">
            {activeLayout === 'welcome' &&
              <div className="item">
                {/* About link */}
                <a
                  className="title"
                  href={links.icoHomePageLink}
                  target={`${isTouchDevice() ? '_self' : '_blank'}`}
                >
                  {t('index.header.about')}
                </a>
              </div>
            }
            {(activeLayout === 'welcome' && ['Approved'].includes(verifyStatus)) &&
              <div className="item">
                <Link to="/account" className="title">Go to dashboard</Link>
              </div>
            }
            {(['Pending', 'Declined'].includes(verifyStatus)) &&
              <div className="item go-to-dashboard">
                <Link to="/verify" className="title">Complete verification</Link>
              </div>}
            {(['Preliminarily Approved', 'Approved'].includes(verifyStatus)) &&
              <div className="item set-address">
                <div
                  onClick={openSetAddressModal}
                  className="title"
                >
                  {t('account.changeETHAddress')}
                </div>
              </div>
            }
            <div className="item">
              <div
                onClick={openChangePasswordModal}
                className="title"
              >
                {t('account.changePassword.button')}
              </div>
            </div>
            <div className="item support">
              <a
                className="title"
                target="_blank"
                rel="noopener noreferrer"
                href={links.supportLink}
              >
                {t('account.support')}
              </a>
            </div>
            <div className="item">
              <div
                onClick={logout}
                className="title"
              >
                {t('index.header.logout')}
              </div>
            </div>
            {/* <div
              style={{ display: 'none' }}
              className={cx('item', 'dropdown', { open: isLanguageDropdownOpen })}
            >
              <div
                onClick={toggleDropdown(toggleLanguageDropdown, isLanguageDropdownOpen)}
                className="title"
              >
                Language
              </div>
              <div className="nested-items">
                <div className="item">
                  <div onClick={console.log} className="title">English</div>
                </div>
                <div className="item">
                  <div onClick={console.log} className="title">Korean</div>
                </div>
              </div>
            </div> */}
          </div>
        </React.Fragment>
      }
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  isOpen: state.appearance.dashboardIsOpen,
  accountData: {
    firstName: state.account.firstName,
    lastName: state.account.lastName,
  },
  verifyStatus: state.account.verifyStatus,
  isAuthorized: !!state.auth.token,
})

const mapDispatchToProps = {
  closeDashboard: toggleDashboard,
  openLoginModal: () => showModal('login'),
  openRegisterModal: () => showModal('register'),
  openSetAddressModal: () => showModal('set-address'),
  openKYCStatusModal: () => showModal('kyc-status'),
  openChangePasswordModal: () => showModal('changeCurrentPassword'),
  logout: authLogout,
}

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
/*  withState(
    'isLanguageDropdownOpen',
    'toggleLanguageDropdown',
    false,
  ) */
)(Dashboard)
