import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Dashboard from '../../common/Dashboard'
import * as actions from '../../../actions'

const Header = ({ openDashboard, email }) => (
  <div className="Header">
    <div className="header clear">
      <Link to="/welcome" className="logo pull-left">
        <img src="/static/logo.svg" alt="" />
      </Link>
      <ul className="menu pull-right">
        <li className="bordered">
          <button onClick={openDashboard} className="button arrow">{email}</button>
        </li>
      </ul>
      <Dashboard />
    </div>
  </div>
)

Header.propTypes = {
  openDashboard: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
}

const mapDispatchToProps = {
  openDashboard: actions.account.dashboard.toggle,
}

const mapStateToProps = (state) => ({
  email: state.account.dashboard.accountData.email,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
