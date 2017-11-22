import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { set, compose, identity } from 'lodash/fp'

import { Input } from '../../../common'
import { account } from '../../../../actions'

const Withdraw = ({ handleSubmit, submitting }) => (
  <div className="form-block">
    <form onSubmit={handleSubmit} className="form">
      <Field name="address" type="text" component={Input} label="Address" />
      <Field name="amount" type="text" component={Input} label="Amount" />
      <div className="buttons clear">
        <button type="submit" className="button pull-right" disabled={submitting}>
          {!submitting && 'Confirm'}
        </button>
      </div>
    </form>
  </div>
)

Withdraw.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  initialValues: {
    address: state.account.address,
  },
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
