import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

const Progress = ({ stage }) => (
  <div className="Progress">
    <div className="steps">
      <div
        className={cx('item', {
          active: ['terms', 'user-info', 'document', 'loader'].includes(stage),
          checked: ['user-info', 'document', 'loader'].includes(stage),
        })}
      >
        <div className="img" />
        <div className="title">Terms & Conditions</div>
      </div>
      <div
        className={cx('item', {
          active: ['user-info', 'document', 'loader'].includes(stage),
          checked: ['document', 'loader'].includes(stage),
        })}
      >
        <div className="img" />
        <div className="title">Basic Information</div>
      </div>
      <div
        className={cx('item', {
          active: ['document', 'loader'].includes(stage),
          checked: stage === 'loader',
        })}
      >
        <div className="img" />
        <div className="title">Identity Image</div>
      </div>
    </div>
  </div>
)

Progress.propTypes = {
  stage: PropTypes.oneOf(['terms', 'user-info', 'document', 'loader']).isRequired,
}

export default Progress
