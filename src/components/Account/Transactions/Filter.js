import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

const Filter = ({ active, list, set }) => (
  <ul className="pull-left">
    {list.map(({ type, label }) => (
      <li key={type} className={cx({ active: type === active })}>
        <div onClick={() => set(type)}>{label}</div>
      </li>
    ))}
  </ul>
)

Filter.propTypes = {
  set: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['all', 'jnt', 'incoming', 'outgoing']).isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  active: PropTypes.oneOf(['all', 'jnt', 'incoming', 'outgoing']).isRequired,
}

export default Filter
