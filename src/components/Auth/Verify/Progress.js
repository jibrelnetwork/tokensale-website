import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const Progress = ({ t, stage }) => (
  <div className="Progress">
    <div className="steps">
      <div
        className={cx('item', {
          active: ['terms', 'user-info', 'document', 'loader'].includes(stage),
          checked: ['user-info', 'document', 'loader'].includes(stage),
        })}
      >
        <div className="img" />
        <div className="title">{t('verification.stages.terms')}</div>
      </div>
      <div
        className={cx('item', {
          active: ['user-info', 'document', 'loader'].includes(stage),
          checked: ['document', 'loader'].includes(stage),
        })}
      >
        <div className="img" />
        <div className="title">{t('verification.stages.userInfo')}</div>
      </div>
      <div
        className={cx('item', {
          active: ['document', 'loader'].includes(stage),
          checked: stage === 'loader',
        })}
      >
        <div className="img" />
        <div className="title">{t('verification.stages.document')}</div>
      </div>
    </div>
  </div>
)

Progress.propTypes = {
  t: PropTypes.func.isRequired,
  stage: PropTypes.oneOf(['terms', 'user-info', 'document', 'loader']).isRequired,
}

export default translate()(Progress)
