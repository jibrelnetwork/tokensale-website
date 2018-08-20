// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import Controls from './Controls'

import LogoImage from '../../../static/logo-kambio.svg'

type Props = {
  activeLayout?: ActiveLayout
}

const Header = ({ activeLayout }: Props) => (
  <div className="header clear">
    <Link to="/" className="logo pull-left scroll">
      <img src={LogoImage} alt="" />
    </Link>
    <Controls activeLayout={activeLayout} />
    {/* <Route
      path="/welcome/:modal"
      render={() => (
        <div className="header-links pull-right">
          <a
            className="support-link show"
            target="_blank"
            rel="noopener noreferrer"
            href="https://jibrelnetwork.freshdesk.com/support/tickets/new"
          >
            Support
          </a>
          <Link to="/welcome" className="close" />
        </div>
      )}
    /> */}
  </div>
)

Header.defaultProps = {
  activeLayout: 'welcome',
}

export default Header
