import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const Success = ({ t }) => (
  <div className="withdraw-confirm">
    <div className="img success" />
    <p>{t('confirmations.withdraw.success')}</p>
    <Link to="/account" replace className="button">{t('index.header.account')}</Link>
  </div>
)

Success.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(Success)
