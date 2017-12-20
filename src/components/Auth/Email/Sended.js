import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const Sended = ({ t }) => (
  <div className="email-verification">
    <div className="img sended" />
    <p>{t('auth.emailVerification.linkSended')}</p>
    <Link to="/verify" className="button">
      {t('auth.emailVerification.continue')}
    </Link>
  </div>
)

Sended.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(Sended)
