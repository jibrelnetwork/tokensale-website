// @flow

import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { Redirect } from 'react-router-dom'
import { replace } from 'connected-react-router'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'

import { Uploader, Button, ModalOpenButton } from '../../common'

import {
  accountVerifyDocumentUpload,
} from '../../../modules'

import type {
  State,
} from '../../../modules'


import R from '../../../routes.yaml'

type Props = {
  t: TFunction,
  submitting: boolean,
  handleSubmit: Function,
  verifyStage: VerificationStage,
  goBack: (any) => any
}

const Document = ({
  t,
  goBack,
  submitting,
  handleSubmit,
  verifyStage,
}: Props) => (
  <div className="Document">
    { verifyStage === 'terms' && <Redirect to={R.VERIFY_TERMS.path} /> }
    { verifyStage === 'user-info' && <Redirect to={R.VERIFY_USER_INFO.path} /> }
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
          onClick={() => goBack()}
          value="verification.document.goBack"
        />
      </div>
    </form>
  </div>
)

const mapStateToProps = (state: State) => ({
  verifyStage: state.account.verifyStage,
})

const mapDispatchToProps = {
  goBack: () => replace(R.VERIFY_USER_INFO.path),
}

/* eslint-disable fp/no-this */

export default compose(
  translate(),
  connect(
    mapStateToProps,
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
    destroyOnUnmount: true,
  })
)(Document)
