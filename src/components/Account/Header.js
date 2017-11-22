import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { Link } from 'react-router-dom'
import * as actions from '../../actions'

// Undefined state with no ETHAddress

const Header = ({ logout, ETHAddress, verifyStatus }) => (
  <div className="Header">
    <div className="header clear">
      <Link to="/welcome" className="logo pull-left">
        <img src="/static/logo.svg" alt="" />
      </Link>
      <div className="address pull-left">
        <div className="title">Your address</div>
        <div className="value">
          <p>{ETHAddress || '0x000000000...'}</p>
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
        <li><Link to="/account/change_password">Change password</Link></li>
        <li className="bordered">
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  </div>
)

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  ETHAddress: PropTypes.string,
  verifyStatus: PropTypes.string.isRequired,
}

Header.defaultProps = {
  ETHAddress: undefined,
}

const mapStateToProps = (state) => ({
  verifyStatus: state.auth.verifyStatus,
})

const mapDispatchToProps = {
  logout: actions.auth.logout,
  verifyStatusRequestStart: actions.auth.verify.statusRequest,
  verifyStatusRequestCancel: actions.auth.verify.statusRequestCancel,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    /* eslint-disable fp/no-this */
    componentDidMount() { this.props.verifyStatusRequestStart() },
    componentWillUnmount() { this.props.verifyStatusRequestCancel() },
    /* eslint-enable */
  }),
)(Header)
