// @flow

import React from 'react'
// import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

type Props = {
  t: TFunction
}

const Sended = ({ t }: Props) => (
  <div className="email-verification">
    <div className="img sended" />
    <p>{t('auth.emailVerification.linkSended')}</p>
  </div>
)

export default translate()(Sended)
