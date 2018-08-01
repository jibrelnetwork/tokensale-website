// @flow

import React from 'react'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

type Props = {
  t: TFunction,
}

const Suisse = ({ t }: Props) => (
  <div className="section suisse">
    <div className="inner">
      <p>{t('index.suisse')}</p>
      <p><a href="https://bitcoinsuisse.ch/" className="suisse-link" target="_blank" rel="noopener noreferrer"><span /></a></p>
    </div>
  </div>
)

export default translate()(Suisse)
