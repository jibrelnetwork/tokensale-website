import React from 'react'
import { Link, Route } from 'react-router-dom'
import Controls from './Controls'

const Header = () => (
  <div className="header clear">
    <Link to="/welcome" className="logo pull-left scroll">
      <img src="/static/logo.svg" alt="" />
    </Link>
    <Route
      path="/welcome"
      exact
      component={Controls}
    />
    <Route
      path="/welcome/:modal"
      render={() => <Link to="/welcome" className="close" />}
    />
  </div>
)

export default Header
