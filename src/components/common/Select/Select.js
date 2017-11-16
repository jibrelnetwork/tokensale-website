import React from 'react'
import PropType from 'prop-types'
import * as Blueprint from '@blueprintjs/labs'
import { MenuItem } from '@blueprintjs/core';
import Input from '../Input'
import { countries } from '.'

const Select = ({ label, input: { value, onChange }, meta }) => (
  <div className="Select">
    <Blueprint.Select
      items={countries}
      noResults={<MenuItem disabled text="No results." />}
      onItemSelect={onChange}
      itemRenderer={({ item, handleClick }) => (
        <MenuItem key={item} onClick={handleClick} text={item} />
      )}
      itemPredicate={(query, item) => item.toLowerCase().indexOf(query.toLowerCase()) === 0}
      popoverProps={{ placement: 'right' }}
      inputValueRenderer={(_) => _}
    >
      <Input
        type="text"
        meta={meta}
        input={{ value, onChange }}
        label={label}
      />
    </Blueprint.Select>
  </div>
)

Select.propTypes = {
  label: PropType.string.isRequired,
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
