// @flow

import React from 'react'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import type { TFunction } from 'react-i18next'

import Timer from './Timer'

import { ModalOpenButton } from '../common'
import type { State } from '../../modules'

type Props = {
  t: TFunction,
  isAuthorized: boolean,
  isSaleFinished: boolean,
}

const Content = ({ t, isAuthorized, isSaleFinished }: Props) => (
  <div className="Content">
    { isSaleFinished &&
    <React.Fragment>
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
    </React.Fragment>}
    { !isSaleFinished &&
      <React.Fragment>
        <div className="text">
          <h1>{t('index.title.header')}<br />{t('index.title.header2')}</h1>
          <p>{t('index.title.text')}</p>
        </div>
        <Timer />
        { !isAuthorized &&
        <div className="links">
          <ModalOpenButton
            size="big"
            modalName="login"
            value="index.button"
          />
        </div>}
      </React.Fragment>}
  </div>
)

function mapStateToProps(state: State) {
  return {
    isAuthorized: !!state.auth.token,
    isSaleFinished: false,
  }
}

export default compose(
  translate(),
  connect(
    mapStateToProps,
    null
  ),
)(Content)
