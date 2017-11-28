import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import Header from './Header'
import Content from './Content'
import Tokens from './Tokens'
import Benefits from './Benefits'
import Social from './Social'
import * as Auth from '../Auth'

const HOME_PAGE_PATHNAME = '/welcome'

function isHomePage(pathname) {
  return (pathname === HOME_PAGE_PATHNAME)
}

const Welcome = ({ isAuthorized, location: { pathname } }) => (
  <div className="Welcome">
    <div className={cx('section', 'start', { home: isHomePage(pathname) })}>
      <div className="bg-1" />
      <div className="bg-2" />
      <div className="inner">
        <Header />
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
        <Redirect from="/welcome/:not_found" to="/welcome" />
      </Switch>
    </div>
    {isHomePage(pathname) && (
      <div>
        <Tokens />
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
}

const mapStateToProps = (state) => ({
  isAuthorized: !!state.auth.token,
})

export default connect(
  mapStateToProps,
)(Welcome)

