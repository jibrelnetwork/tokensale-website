import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { translate, Interpolate } from 'react-i18next'

import gtm from '../../services/gtm'

import { links } from '../../config'

// eslint-disable-next-line no-unused-vars
function isAddressesAvailable(email) {
  return true
  // return [
  //   'flexxnn@gmail.com',
  //   'ivan.violentov@jibrel.network', // for test
  // ].includes(email)
}

const Addresses = ({
  t,
  pushSendRequestEvent,
  email,
  ethAddress,
  btcAddress,
  verifyStatus,
}) => (!isAddressesAvailable(email) ? null : (
  <div className="Addresses">
    {verifyStatus === 'Declined' ? (
      <div className="addresses declined clear">
        <div className="info-block">
          <div className="icon status-declined" />
          <div>
            <Interpolate
              i18nKey="account.verificationDeclined.message"
              support={(
                <a
                  style={{ margin: '0 5px' }}
                  href={links.icoHomePageLink}
                  onClick={pushSendRequestEvent}
                >
                  {t('account.verificationDeclined.support')}
                </a>
              )}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="addresses clear">
        <div className="item">
          <div className="img eth" />
          <div className="title">{t('account.icoAddresses.eth')}</div>
          <div className="value">{ethAddress || t('account.icoAddresses.notAvailable')}</div>
        </div>
        <div className="item">
          <div className="img btc" />
          <div className="title">{t('account.icoAddresses.btc')}</div>
          <div className="value">{btcAddress || t('account.icoAddresses.notAvailable')}</div>
        </div>
      </div>
    )}
  </div>
))

Addresses.propTypes = {
  t: PropTypes.func.isRequired,
  pushSendRequestEvent: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  /* optional */
  btcAddress: PropTypes.string,
  ethAddress: PropTypes.string,
  verifyStatus: PropTypes.string,
}

Addresses.defaultProps = {
  ethAddress: undefined,
  btcAddress: undefined,
  verifyStatus: null,
}

const mapStateToProps = (state) => ({
  btcAddress: state.account.btcAddress,
  ethAddress: state.account.ethAddress,
  verifyStatus: state.auth.verifyStatus,
  email: state.account.email,
})

const mapDispatchToProps = {
  pushSendRequestEvent: gtm.pushProfileSendRequest,
}

const enhance = compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)

export default enhance(Addresses)
