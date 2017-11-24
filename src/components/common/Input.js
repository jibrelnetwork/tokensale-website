import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

const Input = ({
  type,
  input,
  label,
  meta: {
    error,
    touched,
  },
}) => (
  <div className={cx(
    'field',
    `field-${type === 'checkbox' ? 'checkbox' : 'input'}`,
    { error: error && touched })}
  >
    <input
      {...input}
      id={type === 'checkbox' ? label : undefined}
      type={type}
      required={type !== 'checkbox'}
      placeholder={label}
    />
    {type === 'checkbox' && <label htmlFor={label}>{label}</label>}
    {touched && error && <div className="error-text">{error}</div>}
  </div>
)

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'checkbox']).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  input: PropTypes.shape({ // redux-form injected props
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool]).isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({ // redux-form injected props
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    touched: PropTypes.bool,
  }).isRequired,
}

export default Input
