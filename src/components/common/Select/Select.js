import React from 'react'
import PropType from 'prop-types'
import * as Blueprint from '@blueprintjs/labs'
import { MenuItem } from '@blueprintjs/core';
import { countries } from '.'

const Select = ({ input: { value, onChange }, meta: { error, touched } }) => (
  <div className="Select">
    <Blueprint.Select
      items={countries}
      noResults={<MenuItem disabled text="No results." />}
      onItemSelect={onChange}
      itemRenderer={({ item, handleClick }) => (
        <MenuItem key={item} onClick={handleClick} text={item} />
      )}
      itemPredicate={(query, item) => item.toLowerCase().indexOf(query.toLowerCase()) === 0}
      inputValueRenderer={(_) => _}
    >
      <input value={value} />
    </Blueprint.Select>
    {touched && (error && <div className="error">{error}</div>)}
  </div>
)

Select.propTypes = {
  input: PropType.shape({ // redux-form injected props
    value: PropType.string.isRequired,
    onChange: PropType.func.isRequired,
  }).isRequired,
  meta: PropType.shape({ // redux-form injected props
    error: PropType.oneOfType([PropType.array, PropType.string]),
    touched: PropType.bool,
  }).isRequired,
}

export default Select
