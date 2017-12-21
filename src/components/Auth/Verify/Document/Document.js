import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { translate } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import { withState, withHandlers } from 'recompose'

import * as actions from '../../../../actions'
import { Uploader, Modal } from '../../../common'

const Document = ({
  t,
  skip,
  setStage,
  submitting,
  handleSubmit,
  openSkipModal,
  closeSkipModal,
  isSkipModalOpen,
}) => (
  <div className="Document">
    <Modal
      isOpen={isSkipModalOpen}
      onClose={closeSkipModal}
    >
      <div>
        {t('verification.document.modal.message')}
      </div>
      <div className="buttons">
        <button
          onClick={skip}
          className="button bordered"
        >
          {t('verification.document.modal.skipUpload')}
        </button>
        <button
          onClick={closeSkipModal}
          disabled={submitting}
          className="button bordered"
        >
          {t('verification.document.modal.close')}
        </button>
      </div>
    </Modal>
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
          className="button bordered pull-right"
        >
          {!submitting && t('verification.document.submit')}
        </button>
        <div
          style={{ marginRight: 5 }}
          onClick={openSkipModal}
          className="link pull-right"
        >
          {t('verification.document.skip')}
        </div>
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
  skip: PropTypes.func.isRequired,
  setStage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  openSkipModal: PropTypes.func.isRequired,
  closeSkipModal: PropTypes.func.isRequired,
  isSkipModalOpen: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  form: `account-${state.auth.token}`,
})

const mapDispatchToProps = {
  skip: actions.auth.verify.skipDocument,
  setStage: actions.auth.verify.setStage,
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
    onSubmit: ({ document }, dispatch) =>
      dispatch(actions.auth.verify.uploadDocument(document)),
    validate: ({ document }, { t }) => !document || !document.name
      ? { document: t('verification.document.errors.uploader.isRequired') }
      : {},
    initialValues: {
      document: {},
    },
    destroyOnUnmount: false,
  })
)(Document)
