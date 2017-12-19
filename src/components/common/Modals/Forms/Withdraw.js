import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { translate, Interpolate } from 'react-i18next'
import { lifecycle, withHandlers } from 'recompose'

import { account } from '../../../../actions'

const ICONS = {
  confirm: 'withdraw-tokens',
  notApproved: 'status-declined',
  emptyBalance: 'ico-waiting',
  emptyAddress: 'eth',
  notAvailable: 'ico-waiting',
  withdrawRequested: 'email',
}

const Withdraw = ({
  t,
  address,
  balance,
  submitting,
  messageType,
  handleSubmit,
  submitWithdraw,
}) => (
  <div className="form-block">
    <form onSubmit={handleSubmit(submitWithdraw)} className="form">
      <div className="info-block">
        <div className={cx('icon', ICONS[messageType])} />
        <div className={cx('info-text', { 'withdraw-text': messageType === 'confirm' })}>
          {messageType === 'confirm' ? (
            <Interpolate
              i18nKey="account.withdraw.confirm.text"
              amount={<span className="withdraw-balance">{`${balance.toFixed(2)} JNT`}</span>}
              address={<span className="withdraw-address">{address}</span>}
            />
          ) : t(`account.withdraw.${messageType}.text`)}
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="bordered button" disabled={submitting}>
          {!submitting && t(`account.withdraw.${messageType}.button`)}
        </button>
      </div>
    </form>
  </div>
)

Withdraw.propTypes = {
  t: PropTypes.func.isRequired,
  address: PropTypes.string,
  balance: PropTypes.number,
  submitting: PropTypes.bool.isRequired,
  messageType: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitWithdraw: PropTypes.func.isRequired,
}

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
  requestWithdraw: account.balance.requestWithdraw,
  changeModalState: account.modals.changeState,
  setWithdrawRequested: account.balance.withdrawRequested,
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
      props.changeModalState('withdraw', 'close'),
  }),
  withHandlers({
    submitWithdraw: (props) => () =>
      props.messageType
        ? props.closeWithdrawModal()
        : props.requestWithdraw(),
  }),
)(Withdraw)

/* eslint-enable */
