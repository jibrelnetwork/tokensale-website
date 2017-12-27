import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import * as Auth from '../Auth'
import { Modals, Social } from '../common'
import Header from './Header'
import Content from './Content'
import Benefits from './Benefits'
import ConfirmWithdraw from './ConfirmWithdraw'
import ConfirmAddressChange from './ConfirmAddressChange'

const { KYCStatusModal, SetAddressModal, ChangePasswordModal } = Modals
const HOME_PAGE_PATHNAME = '/welcome'
const EMAIL_SENDED_PAGE_PATHNAME = '/welcome/email/sended'

function getPageName(pathname) {
  switch (pathname) {
    case HOME_PAGE_PATHNAME:
      return 'home'
    case EMAIL_SENDED_PAGE_PATHNAME:
      return 'email-sended'
    default:
      return ''
  }
}

const Welcome = ({ location: { pathname }, isAuthorized, isSupportLinkShown }) => (
  <div className="Welcome">
    <div className={cx('section', 'start', getPageName(pathname))}>
      <div className="bg-1" />
      <div className="bg-2" />
      <div className="inner">
        <Header isSupportLinkShown={isSupportLinkShown} />
        <Route path="/welcome" exact component={Content} />
      </div>
      <Switch>
        {isAuthorized
          ? <Redirect from="/welcome/login" to="/welcome" />
          : <Route path="/welcome/login" component={Auth.Login} />
        }
        {isAuthorized
          ? <Redirect from="/welcome/register" to="/welcome" />
          : <Route path="/welcome/register" component={Auth.Register} />
        }
        <Route path="/welcome/email/" component={Auth.Email} />
        <Route path="/welcome/password/" component={Auth.Password} />
        <Route
          component={ConfirmWithdraw}
          path="/welcome/withdraw-confirm/"
        />
        <Route
          component={ConfirmAddressChange}
          path="/welcome/change-address-confirm/"
        />
        <Redirect from="/welcome/:not_found" to="/welcome" />
      </Switch>
    </div>
    <KYCStatusModal />
    <SetAddressModal />
    <ChangePasswordModal />
    {(getPageName(pathname) === 'home') && (
      <div>
        <Benefits />
        <Social />
      </div>
    )}
  </div>
)

Welcome.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isSupportLinkShown: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthorized: !!state.auth.token,
  isSupportLinkShown: state.auth.isSupportLinkShown,
})

export default connect(
  mapStateToProps,
)(Welcome)

