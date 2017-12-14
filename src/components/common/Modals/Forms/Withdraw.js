import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import withHandlers from 'recompose/withHandlers'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { get, compose } from 'lodash/fp'

import { account } from '../../../../actions'

const MESSAGES = {
  notApproved: {
    text: 'Your KYC status still isn\'t approved. Please, wait while your identity will be ' +
      'verified, or pass KYC check again if it was declined.',
    icon: 'status-declined',
    button: 'Got it!',
  },
  emptyBalance: {
    text: 'You don\'t have any JNT to withdraw.',
    icon: 'ico-waiting',
    button: 'Ok',
  },
  emptyAddress: {
    text: 'Please, specify ETH address to withdraw your JNT.',
    icon: 'eth',
    button: 'Ok',
  },
  notAvailable: {
    text: 'JNT withdrawals will be available starting from 12:00 PM 15th Dec 2017.',
    icon: 'ico-waiting',
    button: 'Got it!',
  },
  withdrawRequested: {
    text: 'An email has been sent to your email address. Click the confirmation link to withdraw ' +
      'your funds!',
    icon: 'email',
    button: 'Got it!',
  },
}

// const START_WITHDRAW_TIME = new Date(Date.UTC(2017, 11, 15, 12, 0, 0, 0))

const Withdraw = ({
  submitWithdraw,
  handleSubmit,
  address,
  messageType,
  balance,
  submitting,
}) => (
  <div className="form-block">
    <form onSubmit={handleSubmit(submitWithdraw)} className="form">
      <div className="info-block">
        <div
          className={cx('icon', ((get(messageType, MESSAGES) || {}).icon || 'withdraw-tokens'))}
        />
        <div className={cx('info-text', { 'withdraw-text': !messageType })}>
          {(get(messageType, MESSAGES) || {}).text || (
            <div>
              You are sending
              <span className="withdraw-balance">{`${balance.toFixed(2)} JNT`}</span>
              to the address
              <span className="withdraw-address">{address}</span>
            </div>
          )}
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="bordered button" disabled={submitting}>
          {!submitting && ((get(messageType, MESSAGES) || {}).button || 'Confirm')}
        </button>
      </div>
    </form>
  </div>
)

Withdraw.propTypes = {
  submitWithdraw: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  /* optional */
  address: PropTypes.string,
  messageType: PropTypes.string,
  balance: PropTypes.number,
}

Withdraw.defaultProps = {
  address: null,
  messageType: null,
  balance: 0,
}

const mapStateToProps = (state) => {
  const { address, balance, isWithdrawRequested } = state.account
  const { verifyStatus } = state.auth

  const messageType = isWithdrawRequested
    ? 'withdrawRequested' : (verifyStatus !== 'Approved')
      ? 'notApproved' : (balance === 0)
        ? 'emptyBalance' : !address
          ? 'emptyAddress' : /* (Date.now() < START_WITHDRAW_TIME)
            ? 'notAvailable' : */ null

  return { address, balance, messageType, isWithdrawRequested }
}

const mapDispatchToProps = {
  requestWithdraw: account.balance.requestWithdraw,
  setWithdrawRequested: account.balance.withdrawRequested,
  closeWithdrawModal: () => account.modals.changeState('withdraw', 'close'),
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'withdraw',
  }),
  withHandlers({
    submitWithdraw: (props) => () => {
      const {
        setWithdrawRequested,
        requestWithdraw,
        closeWithdrawModal,
        messageType,
      } = props

      if (messageType) {
        closeWithdrawModal()
        setTimeout(() => setWithdrawRequested(false), 200)
      } else {
        requestWithdraw()
      }
    },
  }),
)(Withdraw)
