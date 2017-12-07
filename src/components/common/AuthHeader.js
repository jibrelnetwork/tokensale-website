import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { Link } from 'react-router-dom'

import Dashboard from '../common/Dashboard'
import * as actions from '../../actions'

// TODO: Split to subcomponents

const Header = ({
  openSetAddressModal,
  openDashboard,
  address,
  email,
  isDashboardOpen,
  isAccountPage,
}) => (
  <div className="Header">
    <div className="header clear">
      <Link to="/welcome" className="logo pull-left">
        <img src="/static/logo.svg" alt="" />
      </Link>
      <ul className="menu pull-right clear">
        {isAccountPage && (
          <li>
            <div className="address">
              {address && <div className="title">Your address</div>}
              <div className="value" onClick={openSetAddressModal}>
                <div>
                  {address ? `${address.substr(0, 20)}...` : (
                    <div className="add">
                      <div className="icon">+</div>
                      <div className="text">
                        Add ETH Address
                      </div>
                    </div>
                  )}
                </div>
                {address && <div className="edit" />}
              </div>
            </div>
          </li>
        )}
        <li className="support-link">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://jibrelnetwork.freshdesk.com/support/tickets/new"
          >
            Support
          </a>
        </li>
        <li className="bordered">
          <button onClick={openDashboard} className="button arrow">{email}</button>
        </li>
      </ul>
      <button
        onClick={openDashboard}
        className={cx('menu-button', 'pull-right', { active: isDashboardOpen })}
      >
        <span>Menu</span>
      </button>
      <Dashboard isAccountPage={isAccountPage} />
    </div>
  </div>
)

Header.propTypes = {
  openSetAddressModal: PropTypes.func.isRequired,
  openDashboard: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  isDashboardOpen: PropTypes.bool.isRequired,
  /* optional */
  address: PropTypes.string,
  isAccountPage: PropTypes.bool,
}

Header.defaultProps = {
  address: undefined,
  isAccountPage: false,
}

const mapStateToProps = (state) => ({
  address: state.account.address,
  email: state.account.dashboard.accountData.email,
  isDashboardOpen: state.account.dashboard.isOpen,
})

const mapDispatchToProps = {
  getAddress: actions.account.address.get,
  openSetAddressModal: () => actions.account.modals.changeState('setAddress', 'open'),
  openDashboard: actions.account.dashboard.toggle,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() { this.props.getAddress() }, // eslint-disable-line fp/no-this
  }),
)(Header)
