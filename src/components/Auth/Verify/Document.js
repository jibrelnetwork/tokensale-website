import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { translate } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import { withState, withHandlers } from 'recompose'

// import * as actions from '../../../actions'
import { Uploader } from '../../common'

import { JModalOpenButton } from '../../Modals'
import {
  accountVerifyDocumentUpload,
  accountVerifySetStage,
} from '../../../modules'
// import { JText } from '../../base'

const Document = ({
  t,
  setStage,
  submitting,
  handleSubmit,
}) => (
  <div className="Document">
    <form onSubmit={handleSubmit} className="form">
      <Field
        name="document"
        label={t('verification.document.fields.uploader')}
        component={Uploader}
      />
      <div className="buttons clear">
        <button
          type="submit"
          disabled={submitting}
          className="button medium pull-right"
        >
          {t('verification.document.submit')}
        </button>
        <JModalOpenButton modalName="documentSkipUpload" className="button medium white pull-right">
          {t('verification.document.skip')}
        </JModalOpenButton>
        <div
          onClick={() => setStage('user-info')}
          className="link gray"
        >
          {t('verification.document.goBack')}
        </div>
      </div>
    </form>
  </div>
)

Document.propTypes = {
  t: PropTypes.func.isRequired,
  setStage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  form: `account-${state.auth.token}`,
})

const mapDispatchToProps = {
  setStage: accountVerifySetStage,
}

/* eslint-disable fp/no-this */

export default compose(
  translate(),
  withState(
    'isSkipModalOpen',
    'toggleSkipModal',
    false,
  ),
  withHandlers({
    openSkipModal: (props) =>
      () => props.toggleSkipModal(true),
    closeSkipModal: (props) =>
      () => props.toggleSkipModal(false),
  }),
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
    destroyOnUnmount: false,
  })
)(Document)
