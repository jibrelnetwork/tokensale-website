import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import { Input } from '../../../common'
import { account } from '../../../../actions'

const SetAddress = ({ handleSubmit, submitting }) => (
  <div className="form-block">
    <form onSubmit={handleSubmit} className="form">
      <Field name="address" type="text" component={Input} label="Address" />
      <div className="clear">
        <button type="submit" className="bordered button pull-right" disabled={submitting}>
          {!submitting && 'Confirm'}
        </button>
      </div>
    </form>
  </div>
)

SetAddress.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'set-address',
  onSubmit: ({ address }, dispatch) => dispatch(account.address.send(address)),
  validate: ({ address }) => !address
    ? { address: 'Address is required' }
    : !/^(0x)([A-F\d]{40})$/i.test(address)
      ? { address: 'Invalid address' }
      : {},
  destroyOnUnmount: true,
})(SetAddress)
