// @flow

import React from 'react'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import { withHandlers } from 'recompose'

import { Input } from '../common'
import { closeModals, accountAddressChangeRequest } from '../../modules'
import type { State } from '../../modules'

type Props = {
  t: TFunction,
  isAddressChangeRequested: boolean,
  handleSubmit: Function,
  submitAddressChanging: Function,
  submitting: Function,
}

const SetAddress = ({
  t,
  submitting,
  handleSubmit,
  submitAddressChanging,
  isAddressChangeRequested,
}: Props) => (
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

const mapStateToProps = (state: State) => ({
  isAddressChangeRequested: state.account.isAddressChangeRequested,
})

const mapDispatchToProps = {
  requestAddressChange: accountAddressChangeRequest,
  closeSetAddressModal: closeModals,
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
)(SetAddress)

