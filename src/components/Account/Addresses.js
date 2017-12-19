import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { lifecycle } from 'recompose'
import { translate, Interpolate } from 'react-i18next'

import gtm from '../../services/gtm'
import * as actions from '../../actions'

const Addresses = ({
  t,
  ethAddress,
  btcAddress,
  verifyStatus,
  pushSendRequestEvent,
}) => (
  <div className="Addresses">
    {verifyStatus === 'Declined' ? (
      <div className="addresses declined clear">
        <div className="info-block">
          <div className="icon status-declined" />
          <div>
            <Interpolate
              i18nKey="account.verificationDeclined"
              support={(
                <a
                  style={{ margin: '0 5px' }}
                  href="mailto:support@jibrel.network"
                  onClick={pushSendRequestEvent}
                >
                  {t('account.support')}
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
)

Addresses.propTypes = {
  t: PropTypes.func.isRequired,
  btcAddress: PropTypes.string,
  ethAddress: PropTypes.string,
  verifyStatus: PropTypes.string,
  pushSendRequestEvent: PropTypes.func.isRequired,
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
})

const mapDispatchToProps = {
  request: actions.account.addresses.request,
  pushSendRequestEvent: gtm.pushProfileSendRequest,
}

const enhance = compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    /* eslint-disable fp/no-this */
    componentDidMount() { this.props.request() },
    /* eslint-enable */
  }),
)

export default enhance(Addresses)
