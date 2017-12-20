import React from 'react'
import PropTypes from 'prop-types'
import { translate, Interpolate } from 'react-i18next'

const Declined = ({ t }) => (
  <div className="email-verification">
    <div className="img declined" />
    <p>
      <Interpolate
        email={
          <a href="mailto:support@jibrel.network">
            {t('auth.emailVerification.error.email')}
          </a>
        }
        i18nKey="auth.emailVerification.error.message"
      />
    </p>
  </div>
)

Declined.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(Declined)
