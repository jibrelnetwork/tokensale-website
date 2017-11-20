import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { Field, reduxForm } from 'redux-form'
import { Uploader } from '../../common'
import * as actions from '../../../actions'

const Document = ({ setStage, submitting, handleSubmit }) => (
  <div className="Identification">
    <form onSubmit={handleSubmit} className="form">
      <Field name="documentUrl" component={Uploader} />
      <div className="buttons clear">
        <button
          type="submit"
          disabled={submitting}
          className="button bordered pull-right"
        >
          {!submitting && 'Next Step'}
        </button>
        <button
          onClick={() => setStage('user-info')}
          disabled={submitting}
          className="button bordered"
        >
          Previous Step
        </button>
      </div>
    </form>
  </div>
)

Document.propTypes = {
  setStage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  form: `account-${state.auth.token}`,
})

const mapDispatchToProps = {
  setStage: actions.auth.verify.setStage,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    onSubmit: ({ documentUrl }, dispatch) =>
      dispatch(actions.auth.verify.uploadDocument(documentUrl)),
    validate: ({ documentUrl }) => !documentUrl
      ? { documentUrl: 'Upload document scan in order to verify your identity' }
      : {},
    destroyOnUnmount: false,
  })
)(Document)
