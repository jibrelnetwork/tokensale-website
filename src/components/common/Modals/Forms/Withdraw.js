import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import compose from 'lodash/fp/compose'

import { account } from '../../../../actions'

const Withdraw = ({ handleSubmit, /* address, balance, */ submitting }) => (
  <div className="form-block">
    <form onSubmit={handleSubmit} className="form">
      <div className="info-block">
        <div className="icon withdraw-tokens" />
        <div className="info-text">
          JNT withdrawals will be available starting from 12:00 PM 15th Dec 2017
          {/* You are sending
          <span className="withdraw-balance">{`${balance} JNT`}</span>
          to your account address
          <span className="withdraw-address">{address}</span> */}
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="bordered button" disabled={submitting}>
          {!submitting && 'Got it!'}
        </button>
      </div>
    </form>
  </div>
)

Withdraw.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  // address: PropTypes.string.isRequired,
  // balance: PropTypes.number.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  address: state.account.address,
  balance: state.account.balance,
})

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'withdraw',
    // onSubmit: (_, dispatch) => dispatch(account.balance.withdraw()),
    onSubmit: (_, dispatch) => dispatch(account.modals.changeState('withdraw', 'close')),
  })
)(Withdraw)
