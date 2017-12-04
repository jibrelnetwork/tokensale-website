import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import compose from 'lodash/fp/compose'
import { lifecycle } from 'recompose'

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

const mapDispatchToProps = {
  shakeSetAddressModal: () => account.modals.changeState('setAddress', 'shake'),
}

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    form: 'set-address',
    onSubmit: ({ address }, dispatch) => dispatch(account.address.send(address)),
    validate: ({ address }) => !address
      ? { address: 'Address is required' }
      : !/^(0x)?[0-9a-f]{40}$/i.test(address)
        ? { address: 'Invalid Ethereum address' }
        : {},
    destroyOnUnmount: true,
  }),
  lifecycle({
    /* eslint-disable fp/no-this */
    componentWillReceiveProps(nextProps) {
      if (!this.props.submitFailed && nextProps.submitFailed) {
        this.props.shakeSetAddressModal()
      }
    },
    /* eslint-enable */
  })
)(SetAddress)
