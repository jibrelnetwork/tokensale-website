import cx from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

const Select = ({ label, options, input, meta: { error, touched } }) => (
  <div className="Select">
    <div className={cx(
      'field',
      'field-input',
      { error: error && touched })}
    >
      <select {...input} required>
        <option value="" disabled className="placeholder">{label}</option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
      {touched && error && <div className="error-text">{error}</div>}
    </div>
  </div>
)

Select.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired, // redux-form injected props
  meta: PropTypes.shape({ // redux-form injected props
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    touched: PropTypes.bool,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

export default Select
