// @flow
import React from 'react'
import { connect } from 'react-redux'

import { Button, JText } from '../../common'
import { closeModals, accountVerifySkipDocumentUpload } from '../../../modules'

type Props = {
  onCloseClick: Function,
  onSkipUploadClick: Function
}

const DocumentSkipUpload = ({ onSkipUploadClick, onCloseClick }: Props) => (
  <div className="auth">
    <div className="form-block">
      <p className="popup-text"><JText value="verification.document.modal.message" /></p>
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

export default connect(
  null,
  mapDispatchToProps
)(DocumentSkipUpload)
