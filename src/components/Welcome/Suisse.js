import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const Suisse = ({ t }) => (
  <div className="section suisse">
    <div className="inner">
      <p>{t('index.suisse')}</p>
      <p><a href="https://bitcoinsuisse.ch/" className="suisse-link" target="_blank" rel="noopener noreferrer"><span /></a></p>
    </div>
  </div>
)

Suisse.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(Suisse)
