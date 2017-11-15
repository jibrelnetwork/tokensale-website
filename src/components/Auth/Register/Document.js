import React from 'react'
import PropType from 'prop-types'
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
  submitting: PropType.bool.isRequired,
  handleSubmit: PropType.func.isRequired,
}

export default reduxForm({
  form: 'register',
  onSubmit: ({ documentUrl }, dispatch) => dispatch(actions.auth.register.uploadDocument(documentUrl)),
  validate: ({ documentUrl }) => !documentUrl ? { documentUrl: 'Upload document scan in order to verify your identity' } : {},
  destroyOnUnmount: false,
})(Document)
