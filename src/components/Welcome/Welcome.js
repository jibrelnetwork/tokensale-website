import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Benefits from './Benefits'
import Content from './Content'
import Social from './Social'
import Header from './Header'
import * as Auth from '../Auth'

const Welcome = ({ isAuthorized }) => (
  <div className="Welcome">
    <div className="section start">
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
    <Benefits />
    <Social />
  </div>
)

Welcome.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthorized: !!state.auth.token,
})

export default connect(
  mapStateToProps,
)(Welcome)

