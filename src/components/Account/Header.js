import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../actions'

// Undefined state with no ETHAddress

const Header = ({
  logout,
  openSetAddressModal,
  openSetPasswordModal,
  address,
  verifyStatus,
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
      <ul className="menu pull-right">
        <li className="bordered">
          <button onClick={openSetPasswordModal}>Change password</button>
        </li>
        <li className="bordered">
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  </div>
)

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  openSetAddressModal: PropTypes.func.isRequired,
  openSetPasswordModal: PropTypes.func.isRequired,
  verifyStatus: PropTypes.string.isRequired,
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
  openSetAddressModal: () => actions.account.modals.changeState('setAddress', 'open'),
  openSetPasswordModal: () => actions.account.modals.changeState('setPassword', 'open'),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
