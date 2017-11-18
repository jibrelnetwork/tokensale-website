import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { Field, reduxForm } from 'redux-form'
import { Uploader } from '../../common'
import * as actions from '../../../actions'

const Document = ({ submitting, handleSubmit }) => (
  <div className="Identification">
    <form onSubmit={handleSubmit} className="form">
      <Field name="documentUrl" component={Uploader} />
      <div className="submit">
        <button type="submit" disabled={submitting}>Next Step</button>
      </div>
    </form>
  </div>
)

Document.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default compose(
  connect((state, props) => ({ form: `account-${props.id}` })),
  reduxForm({
    onSubmit: ({ documentUrl }, dispatch) => dispatch(actions.auth.verify.uploadDocument(documentUrl)),
    validate: ({ documentUrl }) => !documentUrl ? { documentUrl: 'Upload document scan in order to verify your identity' } : {},
    destroyOnUnmount: false,
  })
)(Document)
