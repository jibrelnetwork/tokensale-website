import cx from 'classnames'
import React from 'react'
import { compose } from 'lodash/fp'
import { withState, withHandlers } from 'recompose'
import PropTypes from 'prop-types'

const DateInput = ({
  mode,
  input,
  label,
  meta: {
    error,
    touched,
  },
  setTextMode,
  setDateMode,
}) => (
  <div className={cx(
    'field',
    'field-input',
    { error: error && touched })}
  >
    <input
      {...input}
      min="1900-01-01"
      max="2010-01-01"
      type={mode}
      onBlur={setTextMode}
      onFocus={setDateMode}
      required
      placeholder={label}
    />
    {touched && error && <div className="error-text">{error}</div>}
  </div>
)

DateInput.propTypes = {
  mode: PropTypes.oneOf(['date', 'text']).isRequired,
  meta: PropTypes.shape({ // redux-form injected props
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    touched: PropTypes.bool,
  }).isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired, // redux-form injected props
  setTextMode: PropTypes.func.isRequired,
  setDateMode: PropTypes.func.isRequired,
}

export default compose(
  withState(
    'mode',
    'toggleMode',
    (props) => props.type,
  ),
  withHandlers({
    setTextMode: (props) => () =>
      !props.input.value &&
      props.toggleMode('text'),
    setDateMode: (props) => () =>
      !props.input.value &&
      props.toggleMode('date'),
  })
)(DateInput)
