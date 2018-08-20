// @flow

import React from 'react'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

type Props = {
  t: TFunction,
}

const Success = ({ t }: Props) => (
  <div className="password-reset">
    <div className="img sended" />
    <p>{t('account.changePassword.success')}</p>
  </div>
)

export default translate()(Success)
