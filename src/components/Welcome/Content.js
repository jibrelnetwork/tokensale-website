import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import * as actions from '../../actions'

const Content = ({ t }) => (
  <div className="Content">
    <div className="text">
      <h1 style={{ color: 'white' }}>{t('index.title.header')}</h1>
      <p>{t('index.title.text')}</p>
    </div>
    <div className="links">
      <div className="link">
        <a
          href="https://medium.com/@jibrelnetwork/checking-your-jnt-balance-on-etherscan-599ebcb4cf3f"
          className="button big"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('index.button')}
        </a>
      </div>
      <div className="link">
        <a
          href="https://medium.com/@jibrelnetwork/how-to-add-jnt-into-an-ethereum-wallet-48ebc2c52817"
          className="button big"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('index.button2')}
        </a>
      </div>
    </div>
  </div>
)

Content.propTypes = {
  t: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  logout: actions.auth.logout,
}

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps,
  )
)(Content)
