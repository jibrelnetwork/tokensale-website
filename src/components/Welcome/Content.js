import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import Timer from './Timer'
import * as actions from '../../actions'

const Content = ({ t, isAuthorized }) => (
  <div className="Content">
    <div className="text">
      <h1 style={{ color: 'white' }}>{t('index.title.header')}</h1>
      <p>{t('index.title.text')}</p>
    </div>
    <Timer />
    <div className="link">
      <Link to={isAuthorized ? '/account' : '/welcome/register'} className="button big">
        {t('index.button')}
      </Link>
    </div>
    <div className="link about-jibrel">
      <a href="https://jibrel.network?from-sale=1" className="button bordered">
        {t('index.header.about')}
      </a>
    </div>
  </div>
)

Content.propTypes = {
  t: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthorized: !!state.auth.token,
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
