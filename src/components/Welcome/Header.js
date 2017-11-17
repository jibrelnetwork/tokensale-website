import React from 'react'
import { Link, Route } from 'react-router-dom'

const Header = () => (
  <div className="header clear">
    <Link to="/welcome" className="logo pull-left scroll">
      <img src="/static/logo.svg" alt="" />
    </Link>
    <Route
      path="/welcome"
      exact
      render={() => (
        <ul className="menu pull-right">
          <li><Link to="/">About Jibrel Network</Link></li>
          <li><Link to="/welcome/register">Sign Up</Link></li>
          <li className="bordered"><Link to="/welcome/login">Sign In</Link></li>
        </ul>
      )}
    />
    <Route
      path="/welcome/:modal"
      render={() => <Link to="/welcome" className="close" />}
    />
  </div>
)

export default Header
