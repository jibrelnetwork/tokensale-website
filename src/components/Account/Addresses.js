import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { withProps, lifecycle } from 'recompose'

import gtm from '../../services/gtm'
import * as actions from '../../actions'

const Addresses = ({
  pushSendRequestEvent,
  verifyStatus,
  isICOStarted,
  btcAddress,
  ethAddress,
}) => (
  <div className="Wallets">
    {verifyStatus === 'Declined' ? (
      <div className="addresses declined clear">
        <div className="info-block">
          <div className="icon status-declined" />
          <p>
            In order to participate in JNT Token Sale,
            <br />
            please, contact Jibrel Team via email
            <a
              style={{ marginLeft: 5 }}
              href="mailto:sale@jibrel.network"
              onClick={pushSendRequestEvent}
            >
              sale@jibrel.network
            </a>
          </p>
        </div>
      </div>
    ) : isICOStarted ? (
      <div className="addresses clear">
        <div className="item">
          <div className="img eth" />
          <div className="title">ETH address for participate</div>
          <div className="value">{ethAddress}</div>
        </div>
        <div className="item">
          <div className="img btc" />
          <div className="title">BTC address for participate</div>
          <div className="value">{btcAddress}</div>
        </div>
      </div>
    ) : (
      <div className="addresses declined clear">
        <div className="info-block">
          <div className="icon ico-waiting" />
          <p>
            Jibrel Network Token Sale starts on 27 November 2017 - 12:00 UTC.
            <br />
            Your dedicated BTC and ETH contribution addresses will be shown here once the token sale starts.
          </p>
        </div>
      </div>
    )}
  </div>
)

Addresses.propTypes = {
  pushSendRequestEvent: PropTypes.func.isRequired,
  verifyStatus: PropTypes.string.isRequired,
  isICOStarted: PropTypes.bool.isRequired,
  /* optional */
  ethAddress: PropTypes.string,
  btcAddress: PropTypes.string,
}

Addresses.defaultProps = {
  ethAddress: undefined,
  btcAddress: undefined,
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
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    /* eslint-disable fp/no-this */
    componentDidMount() { this.props.request() },
    /* eslint-enable */
  }),
  withProps({
    isICOStarted: moment.utc('2017-11-27T12:00') < moment.utc(),
  })
)

export default enhance(Addresses)
