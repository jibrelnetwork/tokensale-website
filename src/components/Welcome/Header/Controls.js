import cx from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { withState } from 'recompose'
import { translate } from 'react-i18next'
import * as actions from '../../../actions'

const Controls = ({
  t,
  logout,
  toggleMenu,
  isMenuOpen,
  isVerified,
  isAuthorized,
}) => (
  <div className="Controls">
    <ul className={cx('menu pull-right', isMenuOpen && 'menu-active')}>
      {isAuthorized ? isVerified ? ([
        <li key="0"><Link to="/account">{t('index.header.account')}</Link></li>,
        <li key="1" className="bordered"><button onClick={logout}>{t('index.header.logout')}</button></li>,
      ]) : ([
        <li key="0"><Link to="/verify">{t('index.header.verification')}</Link></li>,
        <li key="1"className="bordered"><button onClick={logout}>{t('index.header.logout')}</button></li>,
      ]) : ([
        <li key="0"><a href="https://jibrel.network/#about">{t('index.header.about')}</a></li>,
        <li key="1"><Link to="/welcome/register">{t('index.header.registration')}</Link></li>,
        <li key="2" className="bordered"><Link to="/welcome/login">{t('index.header.login')}</Link></li>,
      ])}
    </ul>
    <button
      onClick={() => toggleMenu(!isMenuOpen)}
      className={cx('menu-button', isMenuOpen && 'active')}
    >
      <span>Menu</span>
    </button>
  </div>
)

Controls.propTypes = {
  t: PropTypes.func.isRequired,
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
  translate(),
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
