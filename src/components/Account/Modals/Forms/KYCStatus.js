import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { get } from 'lodash/fp'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import compose from 'lodash/fp/compose'

import { account } from '../../../../actions'

const MESSAGES = {
  Approved: 'Your KYC documentation and identity have been verified. Your submission is complete.',
  Pending: 'Your KYC submission was preliminarily approved but requires manual verification.',
  Declined: 'Your KYC documentation was declined. We’ve sent you an email explaining why. Please ' +
      'contact the sales team for further assistance.',
}

const KYCStatus = ({ handleSubmit, kycStatus, submitting }) => (
  <div className="form-block">
    <form onSubmit={handleSubmit} className="form">
      <div className="info-block">
        <div className={cx('icon kyc-status', kycStatus.toLowerCase())} />
        <p className="info-text">
          {`${get(kycStatus, MESSAGES)}`}
        </p>
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
