import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, noop } from 'lodash/fp'
import { Field, reduxForm } from 'redux-form'
import { withState, withProps, lifecycle } from 'recompose'

import { Uploader } from '../../common'
import * as actions from '../../../actions'

const Document = ({ setStage, submitting, handleSubmit, isTimeLeft, invalid }) => (
  <div className="Identification">
    <form onSubmit={handleSubmit} className="form">
      <Field name="document" component={Uploader} />
      {isTimeLeft && invalid && (
        <div className="info">
          Having trouble uploading your KYC documentation?
          Verification is required to withdraw your JNT.
          You can complete this step at a later stage.
        </div>
      )}
      <div className="buttons clear">
        <button
          type="submit"
          disabled={submitting}
          className="button bordered pull-right"
        >
          {!submitting && (
            isTimeLeft && invalid
              ? 'Skip for now'
              : 'Next Step'
          )}
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
  invalid: PropTypes.bool.isRequired,
  setStage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  isTimeLeft: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  form: `account-${state.auth.token}`,
})

const mapDispatchToProps = {
  setStage: actions.auth.verify.setStage,
}

/* eslint-disable fp/no-this */

export default compose(
  withState(
    'timer',
    'updateTimer',
    8,
  ),
  lifecycle({
    componentWillMount() {
      this.timer = setInterval(
        () => this.props.updateTimer((timer) => timer - 1),
        1000
      )
    },
    componentWillUnmount() {
      clearInterval(this.timer)
    },
    componentDidUpdate() {
      if (this.props.timer === 0) {
        clearInterval(this.timer)
      }
    },
  }),
  withProps(
    ({ timer }) => ({ isTimeLeft: timer === 0 }),
  ),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    onSubmit: ({ document }, dispatch, { isTimeLeft }) =>
      document.url && document.type
        ? dispatch(actions.auth.verify.uploadDocument(document.url, document.type))
        : isTimeLeft
          ? dispatch(actions.auth.verify.skipDocument())
          : noop,
    validate: ({ document: { url, type } = {} }, props) =>
      (!url || !type) && !props.isTimeLeft
        ? { document: 'Upload document scan in order to verify your identity' }
        : {},
    initialValues: {
      document: {
        url: undefined,
        type: undefined,
      },
    },
    destroyOnUnmount: false,
    persistentSubmitErrors: true,
  })
)(Document)
