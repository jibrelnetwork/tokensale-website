import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { translate, Interpolate } from 'react-i18next'

import { account } from '../../../../actions'

const KYCStatus = ({
  t,
  kycStatus,
  submitting,
  handleSubmit,
}) => (
  <div className="form-block">
    <form onSubmit={handleSubmit} className="form">
      <div className="info-block">
        <div className={cx('icon kyc-status', kycStatus)} />
        <div className="info-text">
          <Interpolate
            i18nKey={`account.KYC.statuses.${kycStatus}`}
            support={(
              <a href="https://jibrelnetwork.freshdesk.com/support/tickets/new">
                {t('account.KYC.support')}
              </a>
            )}
          />
        </div>
      </div>
      <div className="text-center">
        <button
          type="submit"
          disabled={submitting}
          className="bordered button"
        >
          {!submitting && t('account.KYC.close')}
        </button>
      </div>
    </form>
  </div>
)

KYCStatus.propTypes = {
  t: PropTypes.func.isRequired,
  kycStatus: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

KYCStatus.defaultProps = {
  kycStatus: 'Pending',
}

const mapStateToProps = (state) => ({
  address: state.account.address,
  balance: state.account.balance,
  kycStatus: state.auth.verifyStatus.toLowerCase(),
})

export default compose(
  translate(),
  connect(mapStateToProps),
  reduxForm({
    form: 'kycStatus',
    onSubmit: (_, dispatch) =>
      dispatch(account.modals.changeState('kycStatus', 'close')),
  })
)(KYCStatus)
