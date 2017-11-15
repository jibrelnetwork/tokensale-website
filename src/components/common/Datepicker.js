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
  input: PropType.object.isRequired, // redux-form injected props
  meta: PropType.shape({ // redux-form injected props
    error: PropType.oneOfType([PropType.array, PropType.string]),
  }).isRequired,
}

export default Datepicker
