// @flow

import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { translate, Interpolate } from 'react-i18next'
import type { TFunction } from 'react-i18next'
import { withState } from 'recompose'

import {
  accountToggleDashboard,
  authLogout,
  showModal,
} from '../../../modules'

import type {
  VerificationStatus,
} from '../../../modules/account'

import { links } from '../../../config'

// function toggleDropdown(handler, isOpen) {
//   return () => handler(!isOpen)
// }

// function isTouchDevice() {
//   return ('ontouchstart' in window) || navigator.maxTouchPoints
// }
type Props = {
  t: TFunction,
  closeDashboard: Function,
  openSetAddressModal: Function,
  openKYCStatusModal: Function,
  logout: Function,
  accountData: {
    firstName: string,
    lastName: string,
  },
  isOpen: boolean,
  isHomePage?: boolean,
  isAccountPage?: boolean,
  verifyStatus: VerificationStatus,
}

const Dashboard = ({
  t,
  closeDashboard,
  openSetAddressModal,
  openKYCStatusModal,
  logout,
  // openChangePasswordModal,
  accountData,
  verifyStatus,
  isOpen,
  isHomePage,
  isAccountPage,
}: Props) => (
  <div onClick={closeDashboard} className={cx('dashboard', { open: isOpen })}>
    <div className="overlay" />
    <div className="content">
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
        {/* {isHomePage && (
          <div className="item">
            <a
              className="title"
              href="https://jibrel.network"
              target={`${isTouchDevice() ? '_self' : '_blank'}`}
            >
              {t('index.header.about')}
            </a>
          </div>
        )} */}
        {isHomePage && (
          <div className="item go-to-dashboard">
            <Link to={verifyStatus ? '/account' : '/verify'} className="title">
              {verifyStatus ? 'Go to dashboard' : 'Complete verification'}
            </Link>
          </div>
        )}
        {(['Pending', 'Declined'].includes(verifyStatus) && isAccountPage) && (
          <div className="item">
            <Link to="/verify" className="title">{t('account.uploadDocument')}</Link>
          </div>
        )}
        {/* <div style={{ display: 'none' }} className="item">
          <div onClick={console.log} className="title">Change email address</div>
        </div> */}
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
        <div className="item set-address">
          <div
            onClick={openSetAddressModal}
            className="title"
          >
            {t('account.changeETHAddress')}
          </div>
        </div>
        {/* <div className="item">
          <div
            onClick={openChangePasswordModal}
            className="title"
          >
            {t('account.changePassword.button')}
          </div>
        </div> */}
        <div className="item">
          <div
            onClick={logout}
            className="title"
          >
            {t('index.header.logout')}
          </div>
        </div>
      </div>
    </div>
  </div>
)

Dashboard.defaultProps = {
  isHomePage: false,
  isAccountPage: false,
  verifyStatus: null,
}

const mapStateToProps = (state) => ({
  isOpen: state.account.dashboardIsOpen,
  accountData: {
    firstName: state.account.firstName,
    lastName: state.account.lastName,
  },
  verifyStatus: state.account.verifyStatus,
})

const mapDispatchToProps = {
  closeDashboard: accountToggleDashboard,
  openSetAddressModal: () => showModal('set-address'),
  openKYCStatusModal: () => showModal('kyc-status'),
  // openChangePasswordModal: showModal(''),
  logout: authLogout,
}

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState(
    'isLanguageDropdownOpen',
    'toggleLanguageDropdown',
    false,
  )
)(Dashboard)
