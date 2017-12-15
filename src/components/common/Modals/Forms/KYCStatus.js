import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { get } from 'lodash/fp'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import compose from 'lodash/fp/compose'

import { account } from '../../../../actions'

const MESSAGES = {
  Pending: (
    <div>
      {'You have yet to submit your KYC documentation. Upload Documents or verify your ' +
        'documentation by'}
      <a
        style={{ marginLeft: '4px' }}
        href="https://jibrelnetwork.freshdesk.com/support/tickets/new"
      >
        Contacting Support Team
      </a>
    </div>
  ),
  'Preliminarily Approved': 'Your KYC submission was preliminarily approved but requires manual ' +
    'verification.',
  Declined: 'Your KYC documentation was declined. We’ve sent you an email explaining why. Please ' +
    'contact the sales team for further assistance.',
  Approved: 'Your KYC documentation and identity have been verified. Your submission is complete.',
}

const KYCStatus = ({ handleSubmit, kycStatus, submitting }) => (
  <div className="form-block">
    <form onSubmit={handleSubmit} className="form">
      <div className="info-block">
        <div className={cx('icon kyc-status', kycStatus.toLowerCase())} />
        <div className="info-text">
          {get(kycStatus, MESSAGES)}
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="bordered button" disabled={submitting}>
          {!submitting && 'Got it!'}
        </button>
      </div>
    </form>
  </div>
)

KYCStatus.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  /* optional */
  kycStatus: PropTypes.string,
}

KYCStatus.defaultProps = {
  kycStatus: 'Pending',
}

const mapStateToProps = (state) => ({
  address: state.account.address,
  balance: state.account.balance,
  kycStatus: state.auth.verifyStatus,
})

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'kycStatus',
    onSubmit: (_, dispatch) => dispatch(account.modals.changeState('kycStatus', 'close')),
  })
)(KYCStatus)
