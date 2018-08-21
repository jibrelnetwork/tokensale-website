// @flow

import React from 'react'
import cx from 'classnames'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

type Props = {
  t: TFunction,
  stage: VerificationStage,
}

const Progress = ({ t, stage }: Props) => (
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

export default translate()(Progress)
