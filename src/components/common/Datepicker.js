import React from 'react'
import cx from 'classnames'
import PropType from 'prop-types'
import { DateInput } from '@blueprintjs/datetime'

const Datepicker = ({ input: { value, onChange }, meta: { error, touched }, label }) => (
  <div className="Datepicker">
    <DateInput
      value={value}
      minDate={new Date('1900-01-01')}
      onChange={onChange}
      inputProps={{ placeholder: label, className: cx('Input', 'field', 'field-input', { error }) }}
      popoverProps={{ placement: 'right' }}
    />
    {touched && error && <div className="error-text">{error}</div>}
  </div>
)

Datepicker.propTypes = {
  label: PropType.string.isRequired,
  input: PropType.shape({
    value: PropType.oneOfType([PropType.instanceOf(Date), PropType.string]),
    onChange: PropType.func.isRequired,
  }).isRequired, // redux-form injected props
  meta: PropType.shape({ // redux-form injected props
    error: PropType.oneOfType([PropType.array, PropType.string]),
    touched: PropType.bool,
  }).isRequired,
}

export default Datepicker
