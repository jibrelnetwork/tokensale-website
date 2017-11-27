import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle, withState } from 'recompose'
import { Link } from 'react-router-dom'
import * as actions from '../../actions'

// TODO: Split to subcomponents

const Header = ({
  logout,
  address,
  isMenuOpen,
  toggleMenu,
  verifyStatus,
  openSetAddressModal,
  openKYCStatusModal,
  openSetPasswordModal,
}) => (
  <div className="Header">
    <div className="header clear">
      <Link to="/welcome" className="logo pull-left">
        <img src="/static/logo.svg" alt="" />
      </Link>
      <ul className={cx('menu pull-right clear', isMenuOpen && 'menu-active')}>
        <li>
          <div className="address">
            {address && <div className="title">Your address</div>}
            <div className="value">
              <div onClick={openSetAddressModal}>
                {address ? `${address.substr(0, 20)}...` : (
                  <div className="add">
                    <div className="icon">+</div>
                    <div className="text">
                      Add ETH Address
                    </div>
                  </div>
                )}
              </div>
              {address && <div className="edit" />}
            </div>
          </div>
        </li>
        <li style={{ margin: '0 auto 0 0' }}>
          <div className="kyc-status">
            <div className="title">KYC status</div>
            <div className="value" onClick={openKYCStatusModal}>
              <p>{verifyStatus}</p>
              <div className="show-hint" />
            </div>
          </div>
        </li>
        <li>
          <button className="button clean" onClick={openSetPasswordModal}>Change password</button>
        </li>
        <li className="bordered">
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
      <button
        onClick={() => toggleMenu(!isMenuOpen)}
        className={cx('menu-button', isMenuOpen && 'active')}
      >
        <span>Menu</span>
      </button>
    </div>
  </div>
)

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  openSetAddressModal: PropTypes.func.isRequired,
  openKYCStatusModal: PropTypes.func.isRequired,
  openSetPasswordModal: PropTypes.func.isRequired,
  verifyStatus: PropTypes.string.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  /* optional */
  address: PropTypes.string,
}

Header.defaultProps = {
  address: undefined,
}

const mapStateToProps = (state) => ({
  address: state.account.address,
  verifyStatus: state.auth.verifyStatus,
})

const mapDispatchToProps = {
  logout: actions.auth.logout,
  getAddress: actions.account.address.get,
  verifyStatusRequestStart: actions.auth.verify.statusRequest,
  verifyStatusRequestCancel: actions.auth.verify.statusRequestCancel,
  openSetAddressModal: () => actions.account.modals.changeState('setAddress', 'open'),
  openKYCStatusModal: () => actions.account.modals.changeState('kycStatus', 'open'),
  openSetPasswordModal: () => actions.account.modals.changeState('setPassword', 'open'),
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
  lifecycle({
    /* eslint-disable fp/no-this */
    componentDidMount() {
      const { getAddress, verifyStatusRequestStart } = this.props
      getAddress()
      verifyStatusRequestStart()
    },
    componentWillUnmount() { this.props.verifyStatusRequestCancel() },
    /* eslint-enable */
  }),
)(Header)
