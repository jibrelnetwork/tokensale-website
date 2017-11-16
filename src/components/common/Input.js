import React from 'react'
import cx from 'classnames'
import PropType from 'prop-types'

const Input = ({
  type,
  input,
  label,
  meta: {
    error,
    touched,
  },
}) => (
  <div className={cx('field', 'field-input', { error })}>
    <input {...input} placeholder={label} type={type} />
    {touched && error && <div className="error-text">{error}</div>}
  </div>
)

Input.propTypes = {
  type: PropType.oneOf(['text', 'password', 'checkbox']).isRequired,
  label: PropType.string.isRequired,
  input: PropType.shape({ // redux-form injected props
    value: PropType.oneOfType([PropType.instanceOf(Date), PropType.string]),
    onChange: PropType.func.isRequired,
  }).isRequired,
  meta: PropType.shape({ // redux-form injected props
    error: PropType.oneOfType([PropType.array, PropType.string]),
    touched: PropType.bool,
  }).isRequired,
}

export default Input
