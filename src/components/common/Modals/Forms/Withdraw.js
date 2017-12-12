import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import compose from 'lodash/fp/compose'
import { get } from 'lodash/fp'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { withState, withHandlers } from 'recompose'

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
  confirmThruEmail: {
    text: 'An email has been sent to your email address. Click the confirmation link to withdraw ' +
      'your funds!',
    icon: 'email',
    button: 'Got it!',
  },
}

function getIcon(type, isWithdrawConfirmed) {
  return (get(isWithdrawConfirmed ? 'confirmThruEmail' : type, MESSAGES) || {}).icon
}

function getText(type, isWithdrawConfirmed) {
  return (get(isWithdrawConfirmed ? 'confirmThruEmail' : type, MESSAGES) || {}).text
}

function getButton(type, isWithdrawConfirmed) {
  return (get(isWithdrawConfirmed ? 'confirmThruEmail' : type, MESSAGES) || {}).button
}

const START_WITHDRAW_TIME = new Date(Date.UTC(2017, 11, 15, 12, 0, 0, 0))

const Withdraw = ({
  submitWithdraw,
  handleSubmit,
  address,
  messageType,
  balance,
  submitting,
  isWithdrawConfirmed,
}) => (
  <div className="form-block">
    <form onSubmit={handleSubmit(submitWithdraw)} className="form">
      <div className="info-block">
        <div
          className={cx('icon', (getIcon(messageType, isWithdrawConfirmed) || 'withdraw-tokens'))}
        />
        <div className={cx('info-text', { 'withdraw-text': !messageType })}>
          {getText(messageType, isWithdrawConfirmed) || (
            <div>
              You are sending
              <span className="withdraw-balance">{`${balance} JNT`}</span>
              to your account address
              <span className="withdraw-address">{address}</span>
            </div>
          )}
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="bordered button" disabled={submitting}>
          {!submitting && (getButton(messageType, isWithdrawConfirmed) || 'Confirm')}
        </button>
      </div>
    </form>
  </div>
)

Withdraw.propTypes = {
  submitWithdraw: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  isWithdrawConfirmed: PropTypes.bool.isRequired,
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
  const { address, balance } = state.account
  const { verifyStatus } = state.auth

  const messageType = (verifyStatus !== 'Approved')
    ? 'notApproved' : (balance === 0)
      ? 'emptyBalance' : !address
        ? 'emptyAddress' : (Date.now() < START_WITHDRAW_TIME)
          ? 'notAvailable' : null

  return { address, balance, messageType }
}

const mapDispatchToProps = {
  requestWithdraw: account.balance.withdraw,
  closeWithdrawModal: () => account.modals.changeState('withdraw', 'close'),
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'withdraw',
  }),
  withState(
    'isWithdrawConfirmed',
    'confirmWithdraw',
    false,
  ),
  withHandlers({
    submitWithdraw: (props) => () => {
      const {
        confirmWithdraw,
        requestWithdraw,
        closeWithdrawModal,
        messageType,
        isWithdrawConfirmed,
      } = props

      if (!!messageType || isWithdrawConfirmed) {
        closeWithdrawModal()
      } else {
        requestWithdraw()
        confirmWithdraw(true)
      }
    },
  }),
)(Withdraw)
