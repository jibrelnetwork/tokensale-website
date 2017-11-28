import cx from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { withState } from 'recompose'
import * as actions from '../../../actions'

const Controls = ({
  logout,
  toggleMenu,
  isMenuOpen,
  isVerified,
  isAuthorized,
}) => (
  <div className="Controls">
    <ul className={cx('menu pull-right', isMenuOpen && 'menu-active')}>
      {isAuthorized ? isVerified ? ([
        <li key="0"><Link to="/account">Go to dashboard</Link></li>,
        <li key="1" className="bordered"><button onClick={logout}>Logout</button></li>,
      ]) : ([
        <li key="0"><Link to="/verify">Complete verification</Link></li>,
        <li key="1"className="bordered"><button onClick={logout}>Logout</button></li>,
      ]) : ([
        <li key="0"><a href="https://jibrel.network">About Jibrel Network</a></li>,
        <li key="1"><Link to="/welcome/register">Sign Up</Link></li>,
        <li key="2" className="bordered"><Link to="/welcome/login">Sign In</Link></li>,
      ])}
    </ul>
    <button
      onClick={() => toggleMenu(!isMenuOpen)}
      className={cx('menu-button', 'pull-right', isMenuOpen && 'active')}
    >
      <span>Menu</span>
    </button>
  </div>
)

Controls.propTypes = {
  logout: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState(
    'isMenuOpen',
    'toggleMenu',
    false,
  )
)(Controls)
