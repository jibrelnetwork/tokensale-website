import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'

import { account } from '../../../../actions'

const Withdraw = ({ handleSubmit, address, balance, submitting }) => (
  <div className="form-block">
    <form onSubmit={handleSubmit} className="form">
      <div className="info-block">
        <div className="icon withdraw-tokens" />
        <p>
          You are sending <b>{`${balance} JNT`}</b> to your account address <b>{address}</b>
        </p>
      </div>
      <div className="text-center">
        <button type="submit" className="bordered button" disabled={submitting}>
          {!submitting && 'Confirm'}
        </button>
      </div>
    </form>
  </div>
)

Withdraw.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
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
    onSubmit: ({ address, amount }, dispatch) => dispatch(account.balance.withdraw(address, amount)),
    validate: ({ address, amount }) => compose(
      !address
        ? set('address', 'Address is required')
        : !/^(0x)([A-F\d]{40})$/i.test(address)
          ? set('address', 'Invalid address')
          : identity,
      !amount
        ? set('amount', 'Amount is required')
        : !(parseFloat(amount, 10) > 0)
          ? set('amount', 'Amount should be greater than 0')
          : identity,
    )({}),
    destroyOnUnmount: true,
  })
)(Withdraw)
