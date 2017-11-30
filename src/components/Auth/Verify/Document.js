import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { translate } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'

import { Uploader } from '../../common'
import * as actions from '../../../actions'

const Document = ({ t, setStage, submitting, handleSubmit }) => (
  <div className="Identification">
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
          {!submitting && 'Next Step'}
        </button>
        <button
          onClick={() => setStage('user-info')}
          disabled={submitting}
          className="button bordered"
        >
          {t('verification.document.goBack')}
        </button>
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
  setStage: actions.auth.verify.setStage,
}

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    onSubmit: ({ document }, dispatch) =>
      dispatch(actions.auth.verify.uploadDocument(document.url, document.type)),
    validate: ({ document: { url, type } = {} }, { t }) => !url || !type
      ? { document: t('verification.document.errors.uploader.isRequired') }
      : {},
    initialValues: {
      document: {
        url: undefined,
        type: undefined,
      },
    },
    destroyOnUnmount: false,
  })
)(Document)
