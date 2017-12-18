import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const Sended = ({ t }) => (
  <div className="password-reset">
    <div className="img sended" />
    <p>{t('auth.resetPasswordLinkSended')}</p>
  </div>
)

Sended.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(Sended)
