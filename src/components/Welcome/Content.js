import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'

import Timer from './Timer'

import * as actions from '../../actions'

const Content = ({ t, isAuthorized, isSaleFinished }) => (
  <div className="Content">
    { isSaleFinished &&
    <div>
      <div className="text">
        <h1>{t('index.title.header')}<br />{t('index.title.header2')}</h1>
        <p>{t('index.title.text')}</p>
      </div>
      <div className="links">
        <div className="link">
          <a
            href="https://medium.com/@jibrelnetwork/checking-your-jnt-balance-on-etherscan-599ebcb4cf3f"
            className="button big banking"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('index.button')}
          </a>
        </div>
        <div className="link">
          <a
            href="https://medium.com/@jibrelnetwork/how-to-add-jnt-into-an-ethereum-wallet-48ebc2c52817"
            className="button big wallet"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('index.button2')}
          </a>
        </div>
      </div>
    </div>}
    { !isSaleFinished &&
      <div>
        <div className="text">
          <h1>{t('index.title.header')}<br />{t('index.title.header2')}</h1>
          <p>{t('index.title.text')}</p>
        </div>
        <Timer />
        <div className="link">
          <Link to={isAuthorized ? '/account' : '/welcome/login'} className="button big">
            {t('index.button')}
          </Link>
        </div>
      </div>}
  </div>
)

Content.propTypes = {
  t: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isSaleFinished: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthorized: !!state.auth.token,
  isSaleFinished: false,
})

const mapDispatchToProps = {
  logout: actions.auth.logout,
}

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(Content)

