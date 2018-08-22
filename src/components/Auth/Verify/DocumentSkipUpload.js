// @flow

import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import { Button } from '../../common'
import { closeModals, accountVerifySkipDocumentUpload } from '../../../modules'

type Props = {
  t: TFunction,
  onCloseClick: Function,
  onSkipUploadClick: Function
}

const DocumentSkipUpload = ({ t, onSkipUploadClick, onCloseClick }: Props) => (
  <div className="auth">
    <div className="form-block">
      <p className="popup-text">{t('verification.document.modal.message')}</p>
      <div className="buttons clear">
        <Button
          onClick={onSkipUploadClick}
          colorStyle="transparent"
          className="pull-right"
          value="verification.document.modal.skipUpload"
        />
        <Button
          onClick={onCloseClick}
          className="pull-left"
          value="verification.document.modal.close"
        />
      </div>
    </div>
  </div>
)

const mapDispatchToProps = {
  onCloseClick: closeModals,
  onSkipUploadClick: accountVerifySkipDocumentUpload,
}

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(DocumentSkipUpload)
