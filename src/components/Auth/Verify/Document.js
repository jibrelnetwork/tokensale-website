import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { withState, withHandlers } from 'recompose'
import { Field, reduxForm } from 'redux-form'

import * as actions from '../../../actions'
import { Uploader, Modal } from '../../common'

const Document = ({
  skip,
  setStage,
  submitting,
  handleSubmit,
  openSkipModal,
  closeSkipModal,
  isSkipModalOpen,
}) => (
  <div className="Identification">
    <Modal
      isOpen={isSkipModalOpen}
      onClose={closeSkipModal}
    >
      <div>
        Verification is required to withdraw your JNT. You can complete this step at a later stage.
      </div>
      <div className="buttons clear">
        <button
          onClick={skip}
          className="button bordered pull-right"
        >
          Upload later
        </button>
        <button
          onClick={closeSkipModal}
          disabled={submitting}
          className="button bordered"
        >
          Upload now
        </button>
      </div>
    </Modal>
    <form onSubmit={handleSubmit} className="form">
      <Field name="document" component={Uploader} />
      <div className="buttons clear">
        <button
          type="submit"
          disabled={submitting}
          className="button bordered pull-right"
        >
          {!submitting && 'Next Step'}
        </button>
        <div
          style={{ marginRight: 5 }}
          onClick={openSkipModal}
          className="button bordered pull-right"
        >
          Skip for now
        </div>
        <div
          onClick={() => setStage('user-info')}
          className="button bordered"
        >
          Previous Step
        </div>
      </div>
    </form>
  </div>
)

Document.propTypes = {
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
    validate: ({ document }) => !document || !document.name
      ? { document: 'Upload document scan in order to verify your identity' }
      : {},
    initialValues: {
      document: {},
    },
    destroyOnUnmount: false,
  })
)(Document)
