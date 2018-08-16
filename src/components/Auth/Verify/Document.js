// @flow

import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'

import { Uploader, Button, ModalOpenButton } from '../../common'

import {
  accountVerifyDocumentUpload,
  accountVerifySetStage,
} from '../../../modules'

// import type {
//   accountVerifySetStageType,
// } from '../../../modules/account'

type Props = {
  t: TFunction,
  submitting: boolean,
  handleSubmit: Function,
  setStage: (stage: VerificationStage) => any
}

const Document = ({
  t,
  setStage,
  submitting,
  handleSubmit,
}: Props) => (
  <div className="Document">
    <form onSubmit={handleSubmit} className="form">
      <Field
        name="document"
        label={t('verification.document.fields.uploader')}
        component={Uploader}
      />
      <div className="buttons clear">
        <Button
          type="submit"
          disabled={submitting}
          className="pull-right"
          value="verification.document.submit"
        />
        <ModalOpenButton
          modalName="documentSkipUpload"
          className="pull-right"
          colorStyle="transparent"
          value="verification.document.skip"
        />
        <Button
          disabled={submitting}
          colorStyle="transparent"
          className="pull-left"
          onClick={() => setStage('user-info')}
          value="verification.document.goBack"
        />
      </div>
    </form>
  </div>
)

const mapDispatchToProps = {
  setStage: accountVerifySetStage,
}

/* eslint-disable fp/no-this */

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps,
  ),
  reduxForm({
    form: 'account-verification-document-upload-form',
    onSubmit: ({ document }, dispatch) =>
      dispatch(accountVerifyDocumentUpload(document)),
    validate: ({ document }, { t }) => !document || !document.name
      ? { document: t('verification.document.errors.uploader.isRequired') }
      : {},
    initialValues: {
      document: {},
    },
    destroyOnUnmount: false,
  })
)(Document)
