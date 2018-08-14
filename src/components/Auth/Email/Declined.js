// @flow

import React from 'react'
import { translate, Interpolate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import { links as config } from '../../../config'

type Props = {
  t: TFunction
}

const Declined = ({ t }: Props) => (
  <div className="email-verification">
    <div className="img declined" />
    <p>
      <Interpolate
        email={
          <a href={`mailto:${config.supportEmailAddress}`}>
            {t('auth.emailVerification.error.email')}
          </a>
        }
        i18nKey="auth.emailVerification.error.message"
      />
    </p>
  </div>
)

export default translate()(Declined)
