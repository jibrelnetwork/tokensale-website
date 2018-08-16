// @flow

import React from 'react'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import benefit1 from '../../static/icons/benefit-1.svg'
import benefit2 from '../../static/icons/benefit-2.svg'
import benefit3 from '../../static/icons/benefit-3.svg'
import benefit4 from '../../static/icons/benefit-4.svg'

type Props = {
   t: TFunction,
}

const Benefits = ({ t }: Props) => (
  <div className="section benefits">
    <div className="inner">
      <div className="row clear">
        <div className="col-3 benefit-1">
          <div className="img">
            <img src={benefit1} alt="" />
          </div>
          <h3>{t('index.info.price.title')}</h3>
          <p>{t('index.info.price.text')}</p>
        </div>
        <div className="col-3 benefit-2">
          <div className="img">
            <img src={benefit2} alt="" />
          </div>
          <h3>{t('index.info.currencies.title')}</h3>
          <p>{t('index.info.currencies.text')}</p>
        </div>
        <div className="col-3 benefit-3">
          <div className="img">
            <img src={benefit3} alt="" />
          </div>
          <h3>{t('index.info.exchange.title')}</h3>
          <p>{t('index.info.exchange.text')}</p>
        </div>
        <div className="col-3 benefit-4">
          <div className="img">
            <img src={benefit4} alt="" />
          </div>
          <h3>{t('index.info.jurisdictions.title')}</h3>
          <p>{t('index.info.jurisdictions.text')}</p>
        </div>
      </div>
    </div>
  </div>
)

export default translate()(Benefits)
