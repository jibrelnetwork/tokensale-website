import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle, withState } from 'recompose'
import { Link } from 'react-router-dom'

import * as actions from '../../actions'

function toggleDropdown(handler, isOpen) {
  return () => handler(!isOpen)
}

function isTouchDevice() {
  return ('ontouchstart' in window) || navigator.maxTouchPoints
}

const Dashboard = ({
  closeDashboard,
  openSetAddressModal,
  openKYCStatusModal,
  openSetPasswordModal,
  logout,
  toggleLanguageDropdown,
  accountData,
  verifyStatus,
  isOpen,
  isLanguageDropdownOpen,
  isHomePage,
  isAccountPage,
}) => (
  <div onClick={closeDashboard} className={cx('dashboard', { open: isOpen })}>
    <div className="overlay" />
    <div className="content">
      {!!verifyStatus && (
        <div className="head">
          <div className="name">
            {`${accountData.firstName || '...'} ${accountData.lastName || '...'}`}
          </div>
          <div className="status">{`KYC Status - ${verifyStatus}`}</div>
          <div onClick={openKYCStatusModal} className="status-info" />
        </div>
      )}
      <div className="body">
        {isHomePage && (
          <div className="item">
            <a
              className="title"
              href="https://jibrel.network"
              target={`${isTouchDevice() ? '_self' : '_blank'}`}
            >
              About Jibrel Network
            </a>
          </div>
        )}
        {isHomePage && (
          <div className="item go-to-dashboard">
            <Link to={verifyStatus ? '/account' : '/verify'} className="title">
              {verifyStatus ? 'Go to dashboard' : 'Complete verification'}
            </Link>
          </div>
        )}
        {(['Pending', 'Declined'].includes(verifyStatus) && isAccountPage) && (
          <div className="item">
            <Link to="/verify" className="title">Upload document</Link>
          </div>
        )}
        <div style={{ display: 'none' }} className="item">
          <div onClick={console.log} className="title">Change email address</div>
        </div>
        <div
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
        </div>
        <div className="item support">
          <a
            className="title"
            target="_blank"
            rel="noopener noreferrer"
            href="https://jibrelnetwork.freshdesk.com/support/tickets/new"
          >
            Support
          </a>
        </div>
        {(verifyStatus === 'Approved') && (
          <div className="item set-address">
            <div onClick={openSetAddressModal} className="title">Change ETH address</div>
          </div>
        )}
        <div className="item">
          <div onClick={openSetPasswordModal} className="title">Change password</div>
        </div>
        <div className="item">
          <div onClick={logout} className="title">Logout</div>
        </div>
      </div>
    </div>
  </div>
)

Dashboard.propTypes = {
  closeDashboard: PropTypes.func.isRequired,
  openSetAddressModal: PropTypes.func.isRequired,
  openKYCStatusModal: PropTypes.func.isRequired,
  openSetPasswordModal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  toggleLanguageDropdown: PropTypes.func.isRequired,
  accountData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLanguageDropdownOpen: PropTypes.bool.isRequired,
  /* optional */
  verifyStatus: PropTypes.string,
  isHomePage: PropTypes.bool,
  isAccountPage: PropTypes.bool,
}

Dashboard.defaultProps = {
  isHomePage: false,
  isAccountPage: false,
  verifyStatus: null,
}

const mapStateToProps = (state) => ({
  ...state.account.dashboard,
  verifyStatus: state.auth.verifyStatus,
})

const mapDispatchToProps = {
  closeDashboard: actions.account.dashboard.toggle,
  openSetAddressModal: () => actions.account.modals.changeState('setAddress', 'open'),
  openKYCStatusModal: () => actions.account.modals.changeState('kycStatus', 'open'),
  openSetPasswordModal: () => actions.account.modals.changeState('setPassword', 'open'),
  verifyStatusRequestStart: actions.auth.verify.statusRequest,
  verifyStatusRequestCancel: actions.auth.verify.statusRequestCancel,
  logout: actions.auth.logout,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState(
    'isLanguageDropdownOpen',
    'toggleLanguageDropdown',
    false,
  ),
  lifecycle({
    /* eslint-disable fp/no-this */
    componentDidMount() { this.props.verifyStatusRequestStart() },
    componentWillUnmount() { this.props.verifyStatusRequestCancel() },
    /* eslint-enable */
  }),
)(Dashboard)
