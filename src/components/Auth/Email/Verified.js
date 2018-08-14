// @flow

import React from 'react'
// import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

type Props = {
  t: TFunction
}

const Verified = ({ t }: Props) => (
  <div className="email-verification">
    <div className="img verified" />
    <p>{t('auth.emailVerification.success')}</p>
    {/* <Link to="/welcome/login" className="button">
      {t('auth.emailVerification.complete')}
    </Link> */}
  </div>
)

/**
 * @TODO: Check here, if the user is logged in -> verify, otherwise
 * display login window
 */

export default translate()(Verified)
