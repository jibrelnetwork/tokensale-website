// @flow
import React from 'react'
import { connect } from 'react-redux'

import { JText } from '../../base'
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
        <button
          onClick={onSkipUploadClick}
          className="button medium transparent pull-right"
        >
          <JText value="verification.document.modal.skipUpload" />
        </button>
        <button
          onClick={onCloseClick}
          className="button medium dark pull-left"
        >
          <JText value="verification.document.modal.close" color="white" />
        </button>
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
