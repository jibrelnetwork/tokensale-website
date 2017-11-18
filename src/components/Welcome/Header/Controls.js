import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../../actions'

const Controls = ({ isAuthorized, isVerified, logout }) => (
  isAuthorized ? isVerified ? (
    <ul className="menu pull-right">
      <li><Link to="/">About Jibrel Network</Link></li>
      <li><Link to="/account">Go to dashboard</Link></li>
      <li className="bordered"><button onClick={logout}>Logout</button></li>
    </ul>
  ) : (
    <ul className="menu pull-right">
      <li><Link to="/">About Jibrel Network</Link></li>
      <li><Link to="/verify">Complete verification</Link></li>
      <li className="bordered"><button onClick={logout}>Logout</button></li>
    </ul>
  ) : (
    <ul className="menu pull-right">
      <li><Link to="/">About Jibrel Network</Link></li>
      <li><Link to="/welcome/register">Sign Up</Link></li>
      <li className="bordered"><Link to="/welcome/login">Sign In</Link></li>
    </ul>
  )
)

Controls.propTypes = {
  logout: PropTypes.func.isRequired,
  isVerified: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isVerified: !!state.auth.verifyStatus,
  isAuthorized: !!state.auth.token,
})

const mapDispatchToProps = {
  logout: actions.auth.logout,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Controls)
