// @flow

import React from 'react'
import cx from 'classnames'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate, Interpolate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import type { State } from '../../modules'

import { links } from '../../config'
import { closeModals } from '../../modules'
import Button from './Button'

type Props = {
  t: TFunction,
  kycStatus: string,
  closeClick: Function,
}

const KYCStatus = ({
  t,
  kycStatus,
  closeClick,
}: Props) => (
  <div className="form-block">
    <div className="info-block">
      <div className={cx('icon kyc-status', kycStatus)} />
      <div className="info-text">
        <Interpolate
          i18nKey={`account.KYC.statuses.${kycStatus || 'pending'}`}
          support={(
            <a href={links.supportLink}>
              {t('account.KYC.support')}
            </a>
          )}
        />
      </div>
    </div>
    <div className="text-center">
      <Button onClick={closeClick} value="account.KYC.close" />
    </div>
  </div>
)

KYCStatus.defaultProps = {
  kycStatus: 'pending',
}

const mapStateToProps = (state: State) => ({
  // address: state.account.address,
  // balance: state.account.balance,
  kycStatus: (state.account.verifyStatus || '').toLowerCase(),
})

const mapDispatchToProps = {
  closeClick: closeModals,
}

export default compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(KYCStatus)
