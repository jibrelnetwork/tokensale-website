import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { DateInput } from '@blueprintjs/datetime'

const Datepicker = ({ input: { value, onChange }, meta: { error, touched }, label }) => (
  <div className="Datepicker">
    <div className={cx('Input', 'field', 'field-input', { error: error && touched })}>
      <DateInput
        value={value}
        minDate={new Date('1900-01-01')}
        onChange={onChange}
        inputProps={{ placeholder: label, className: cx('Input') }}
        popoverProps={{ placement: 'right' }}
      />
      {touched && error && <div className="error-text">{error}</div>}
    </div>
  </div>
)

Datepicker.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    onChange: PropTypes.func.isRequired,
  }).isRequired, // redux-form injected props
  meta: PropTypes.shape({ // redux-form injected props
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    touched: PropTypes.bool,
  }).isRequired,
}

export default Datepicker
