import React from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/fp/compose'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import { lifecycle, withHandlers } from 'recompose'

import { Input } from '../../../common'
import { account } from '../../../../actions'

const SetAddress = ({
  t,
  submitting,
  handleSubmit,
  submitAddressChanging,
  isAddressChangeRequested,
}) => (
  <div className="form-block">
    <form onSubmit={handleSubmit(submitAddressChanging)} className="form">
      {isAddressChangeRequested
        ? (
          <div className="info-block">
            <div className="icon email" />
            <div className="info-text">
              {t('account.setETHAddress.confirm')}
            </div>
          </div>
        ) : (
          <Field
            name="address"
            type="text"
            label={t('account.setETHAddress.fields.address')}
            component={Input}
          />
        )
      }
      <div className="warning">
        {t('account.setETHAddress.addressWarning')}
      </div>
      <div className="clear">
        <button
          type="submit"
          disabled={submitting}
          className="bordered button pull-right"
        >
          {!submitting && isAddressChangeRequested
            ? t('account.setETHAddress.close')
            : t('account.setETHAddress.submit')
          }
        </button>
      </div>
    </form>
  </div>
)

SetAddress.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitAddressChanging: PropTypes.func.isRequired,
  isAddressChangeRequested: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAddressChangeRequested: state.account.isAddressChangeRequested,
})

const mapDispatchToProps = {
  setAddressChangeRequested: account.address.changeRequested,
  requestAddressChange: (address) => account.address.requestChange(address),
  shakeSetAddressModal: () => account.modals.changeState('setAddress', 'shake'),
  closeSetAddressModal: () => account.modals.changeState('setAddress', 'close'),
}

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({
    form: 'set-address',
    validate: ({ address }, { t }) => !address
      ? { address: t('account.setETHAddress.errors.address.isRequired') }
      : !/^(0x)?[0-9a-f]{40}$/i.test(address)
        ? { address: t('account.setETHAddress.errors.address.isInvalid') }
        : {},
    destroyOnUnmount: true,
    touchOnBlur: false,
  }),
  withHandlers({
    submitAddressChanging: (props) => ({ address }) => {
      const { requestAddressChange, closeSetAddressModal, isAddressChangeRequested } = props

      return isAddressChangeRequested ? closeSetAddressModal() : requestAddressChange(address)
    },
  }),
  /* eslint-disable fp/no-this */
  lifecycle({
    componentWillMount() {
      this.props.setAddressChangeRequested(false)
    },
    componentWillReceiveProps(nextProps) {
      if (!this.props.submitFailed && nextProps.submitFailed) {
        this.props.shakeSetAddressModal()
      }
    },
  }),
  /* eslint-enable */
)(SetAddress)

