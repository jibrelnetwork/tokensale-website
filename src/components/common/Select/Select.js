import React from 'react'
import PropTypes from 'prop-types'
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
      popoverProps={{ placement: 'top' }}
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
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({ // redux-form injected props
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({ // redux-form injected props
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    touched: PropTypes.bool,
  }).isRequired,
}

export default Select
