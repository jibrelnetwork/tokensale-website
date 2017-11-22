import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import * as actions from '../../../actions'

const Balance = ({ openWithdrawModal, balance }) => (
  <div className="Balance">
    <div className="button bordered pull-right" onClick={openWithdrawModal}>Withdraw</div>
    <div className="balance pull-right">{`Balance – ${balance} JNT`}</div>
  </div>
)

Balance.propTypes = {
  openWithdrawModal: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  balance: state.account.balance,
})

const mapDispatchToProps = {
  openWithdrawModal: () => actions.account.modals.changeState('withdraw', 'open'),
  requestStart: actions.account.balance.request,
  requestCancel: actions.account.balance.requestCancel,
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    /* eslint-disable fp/no-this */
    componentDidMount() { this.props.requestStart() },
    componentWillUnmount() { this.props.requestCancel() },
    /* eslint-enable */
  }),
)

export default enhance(Balance)
