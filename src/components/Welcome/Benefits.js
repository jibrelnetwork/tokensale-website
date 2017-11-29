import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const Benefits = ({ t }) => (
  <div className="section benefits">
    <div className="inner">
      <div className="row clear">
        <div className="col-3 benefit-1">
          <div className="img">
            <img src="/static/icons/benefit-1.svg" alt="" />
          </div>
          <h3>{t('index.info.price.title')}</h3>
          <p>{t('index.info.price.text')}</p>
        </div>
        <div className="col-3 benefit-2">
          <div className="img">
            <img src="/static/icons/benefit-2.svg" alt="" />
          </div>
          <h3>{t('index.info.currencies.title')}</h3>
          <p>{t('index.info.currencies.text')}</p>
        </div>
        <div className="col-3 benefit-3">
          <div className="img">
            <img src="/static/icons/benefit-3.svg" alt="" />
          </div>
          <h3>{t('index.info.exchange.title')}</h3>
          <p>{t('index.info.exchange.text')}</p>
        </div>
        <div className="col-3 benefit-4">
          <div className="img">
            <img src="/static/icons/benefit-4.svg" alt="" />
          </div>
          <h3>{t('index.info.jurisdictions.title')}</h3>
          <p>{t('index.info.jurisdictions.text')}</p>
        </div>
      </div>
    </div>
  </div>
)

Benefits.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(Benefits)
