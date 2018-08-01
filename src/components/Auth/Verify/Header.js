import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import headerImg from '../../../static/logo-kambio.svg'

import * as actions from '../../../actions'

const Header = ({ t, logout }) => (
  <div className="Header">
    <div className="header clear">
      <Link to="/welcome" className="logo pull-left">
        <img src={headerImg} alt="" />
      </Link>
      <ul className="menu pull-right">
        <li className="bordered">
          <button onClick={logout}>{t('verification.logout')}</button>
        </li>
      </ul>
    </div>
  </div>
)

Header.propTypes = {
  t: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  logout: actions.auth.logout,
}

export default compose(
  translate(),
  connect(
    undefined,
    mapDispatchToProps,
  )
)(Header)
