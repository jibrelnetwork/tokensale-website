import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const Verified = ({ t }) => (
  <div className="email-verification">
    <div className="img verified" />
    <p>{t('auth.emailVerification.success')}</p>
    <Link to="/welcome/login" className="button">
      {t('auth.emailVerification.complete')}
    </Link>
  </div>
)

Verified.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(Verified)
