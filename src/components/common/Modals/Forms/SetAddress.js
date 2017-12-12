/* eslint-disable fp/no-this */

import React from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/fp/compose'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { lifecycle, withHandlers } from 'recompose'

import { Input } from '../../../common'
import { account } from '../../../../actions'

const SetAddress = ({
  submitAddressChanging,
  handleSubmit,
  submitting,
  isAddressChangeRequested,
}) => (
  <div className="form-block">
    <form onSubmit={handleSubmit(submitAddressChanging)} className="form">
      {isAddressChangeRequested
        ? (
          <div className="info-block">
            <div className="icon email" />
            <div className="info-text">
              An email has been sent to your email address. Click the confirmation link to update
              your withdrawal ETH address!
            </div>
          </div>
        ) : <Field name="address" type="text" component={Input} label="Address" />
      }
      <div className="clear">
        <button type="submit" className="bordered button pull-right" disabled={submitting}>
          {!submitting && (isAddressChangeRequested ? 'Ok' : 'Confirm')}
        </button>
      </div>
    </form>
  </div>
)

SetAddress.propTypes = {
  submitAddressChanging: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  isAddressChangeRequested: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAddressChangeRequested: state.account.isAddressChangeRequested,
})

const mapDispatchToProps = {
  shakeSetAddressModal: () => account.modals.changeState('setAddress', 'shake'),
  closeSetAddressModal: () => account.modals.changeState('setAddress', 'close'),
  requestAddressChanging: (address) => account.address.send(address),
  setAddressChangeRequested: account.address.changeRequested,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'set-address',
    validate: ({ address }) => !address
      ? { address: 'Address is required' }
      : !/^(0x)?[0-9a-f]{40}$/i.test(address)
        ? { address: 'Invalid Ethereum address' }
        : {},
    destroyOnUnmount: true,
  }),
  withHandlers({
    submitAddressChanging: (props) => ({ address }) => {
      const {
        requestAddressChanging,
        setAddressChangeRequested,
        closeSetAddressModal,
        isAddressChangeRequested,
      } = props

      if (isAddressChangeRequested) {
        closeSetAddressModal()
        setAddressChangeRequested(false)
      } else {
        requestAddressChanging(address)
      }
    },
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (!this.props.submitFailed && nextProps.submitFailed) {
        this.props.shakeSetAddressModal()
      }
    },
  }),
)(SetAddress)

/* eslint-enable */
