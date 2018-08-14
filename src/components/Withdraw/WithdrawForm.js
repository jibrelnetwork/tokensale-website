// @flow

import React from 'react'
import cx from 'classnames'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { translate, Interpolate } from 'react-i18next'
import type { TFunction } from 'react-i18next'
import { lifecycle, withHandlers } from 'recompose'

import {
  accountWithdrawRequest,
  accountWithdrawSetRequested,
  closeModals,
} from '../../modules'

const ICONS = {
  confirm: 'withdraw-tokens',
  notApproved: 'status-declined',
  emptyBalance: 'ico-waiting',
  emptyAddress: 'eth',
  notAvailable: 'ico-waiting',
  withdrawRequested: 'email',
}

type Props = {
  t: TFunction,
  address: string,
  balance: number,
  submitting: Function,
  messageType: string,
  handleSubmit: Function,
  submitWithdraw: Function,
}

const Withdraw = ({
  t,
  address,
  balance,
  submitting,
  messageType,
  handleSubmit,
  submitWithdraw,
}: Props) => (
  <div className="form-block">
    <form onSubmit={handleSubmit(submitWithdraw)} className="form">
      <div className="info-block">
        <div className={cx('icon', ICONS[messageType])} />
        <div className={cx('info-text', { 'withdraw-text': messageType === 'confirm' })}>
          {messageType === 'confirm' ? (
            <div>
              <Interpolate
                amount={<span className="withdraw-balance">{`${balance.toFixed(2)} KMB`}</span>}
                address={<span className="withdraw-address">{address}</span>}
                i18nKey="account.withdraw.confirm.text"
              />
              <div className="warning">
                {t('account.setETHAddress.addressWarning')}
              </div>
            </div>
          ) : t(`account.withdraw.${messageType}.text`)}
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="button medium dark" disabled={submitting}>
          {t(`account.withdraw.${messageType}.button`)}
        </button>
      </div>
    </form>
  </div>
)

Withdraw.defaultProps = {
  balance: 0,
  address: null,
  messageType: null,
}

const mapStateToProps = (state) => {
  const { verifyStatus } = state.auth
  const { address, balance, isWithdrawRequested } = state.account
  const messageType = isWithdrawRequested
    ? 'withdrawRequested'
    : verifyStatus !== 'Approved'
      ? 'notApproved'
      : balance === 0
        ? 'emptyBalance'
        : !address
          ? 'emptyAddress'
          : 'confirm'
  return { address, balance, messageType, isWithdrawRequested }
}

const mapDispatchToProps = {
  requestWithdraw: accountWithdrawRequest,
  closeModals,
  setWithdrawRequested: accountWithdrawSetRequested,
}

/* eslint-disable fp/no-this */

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'withdraw' }),
  lifecycle({
    componentWillMount() {
      this.props.setWithdrawRequested(false)
    },
  }),
  withHandlers({
    closeWithdrawModal: (props) => () =>
      props.closeModals(),
  }),
  withHandlers({
    submitWithdraw: (props) => () =>
      props.messageType !== 'confirm'
        ? props.closeWithdrawModal()
        : props.requestWithdraw(),
  }),
)(Withdraw)

/* eslint-enable */
