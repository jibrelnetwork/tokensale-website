// @flow
import cx from 'classnames'
import React from 'react'
// import PropTypes from 'prop-types'

import ReactSelect from 'react-select'
// import { compose, withState, withHandlers } from 'recompose'

type Props = {
  label: string,
  options: Object,
  input: Object,
  // selectedOption: string,
  // onValueChange: Function,
  meta: {
    error: string,
    touched: boolean,
  }
}

const normalizeOptions = (options) => options.map((o) => ({ value: o, label: o }))

const Select = ({ label, options, input, meta: { error, touched } }: Props) => (
  <div className={cx('field')}>
    <div className="Select">
      <ReactSelect
        value={input.value}
        onChange={input.onChange}
        isClearable
        isSearchable
        placeholder={label}
        className="react-select"
        classNamePrefix="react-select"
        options={normalizeOptions(options)}
      />
      {touched && error && <div className="error-text">{error}</div>}
    </div>
  </div>
)

export default Select

// const enhance = compose(
//   withState(
//     'selectedOption',
//     'setSelectedOption',
//     (props) => props.input.value
//   ),
//   withHandlers({
//     onValueChange: ({ setSelectedOption }) => (e) => setSelectedOption(e),
//   })
// )

// export default enhance(Select)
