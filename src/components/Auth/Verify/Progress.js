import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Progress = ({ stage }) => (
  <div className="section start">
    <div className="inner">
      <div className="header clear">
        <Link to="index.html" className="logo pull-left">
          <img src="/static/logo.svg" alt="" />
        </Link>
        <ul className="menu pull-right">
          <li className="bordered"><a href="#">Logout</a></li>
        </ul>
        <button className="menu-button">
          <span>Menu</span>
        </button>
      </div>
      <div className="steps">
        <div
          className={cx('item', {
            active: ['terms', 'user-info', 'document'].includes(stage),
            checked: ['user-info', 'document'].includes(stage),
          })}
        >
          <div className="img" />
          <div className="title">Terms & Conditions</div>
        </div>
        <div
          className={cx('item', {
            active: ['user-info', 'document'].includes(stage),
            checked: ['document'].includes(stage),
          })}
        >
          <div className="img" />
          <div className="title">Basic Information</div>
        </div>
        <div
          className={cx('item', {
            active: ['document'].includes(stage),
            checked: false,
          })}
        >
          <div className="img" />
          <div className="title">Identity Image</div>
        </div>
      </div>
    </div>
  </div>
)

Progress.propTypes = {
  stage: PropTypes.oneOf(['terms', 'document', 'user-info']).isRequired,
}

export default Progress
