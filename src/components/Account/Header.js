import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle, withState } from 'recompose'
import { Link } from 'react-router-dom'
import * as actions from '../../actions'

// Undefined state with no ETHAddress

const Header = ({
  logout,
  address,
  isMenuOpen,
  toggleMenu,
  verifyStatus,
  openSetAddressModal,
  openSetPasswordModal,
}) => (
  <div className="Header">
    <div className="header clear">
      <Link to="/welcome" className="logo pull-left">
        <img src="/static/logo.svg" alt="" />
      </Link>
      <div className="address pull-left">
        <div className="title">Your address</div>
        <div className="value">
          <div onClick={openSetAddressModal}>
            {`${(address || '0x000000000').substr(0, 11)}...`}
          </div>
          {/* <a href="#" className="edit" /> */}
        </div>
      </div>
      <div className="kyc-status pull-left">
        <div className="title">KYC status</div>
        <div className="value">
          <p>{verifyStatus}</p>
        </div>
      </div>
      <ul className={cx('menu pull-right', isMenuOpen && 'menu-active')}>
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
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  verifyStatus: PropTypes.string.isRequired,
  openSetAddressModal: PropTypes.func.isRequired,
  openSetPasswordModal: PropTypes.func.isRequired,
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
