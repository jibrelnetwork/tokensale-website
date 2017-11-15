import React from 'react'
import PropType from 'prop-types'
import { DateInput } from '@blueprintjs/datetime'

const Datepicker = ({ input: { value, onChange }, meta: { error, touched } }) => (
  <div className="Datepicker">
    <DateInput
      value={value}
      minDate={new Date('1900-01-01')}
      onChange={onChange}
    />
    {touched && (error && <div className="error">{error}</div>)}
  </div>
)

Datepicker.propTypes = {
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
