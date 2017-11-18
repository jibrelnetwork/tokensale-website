import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../../actions'

const Header = ({ logout }) => (
  <div className="Header">
    <div className="header clear">
      <Link to="/welcome" className="logo pull-left">
        <img src="/static/logo.svg" alt="" />
      </Link>
      <ul className="menu pull-right">
        <li className="bordered">
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  </div>
)

Header.propTypes = {
  logout: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  logout: actions.auth.logout,
}

export default connect(
  undefined,
  mapDispatchToProps,
)(Header)
