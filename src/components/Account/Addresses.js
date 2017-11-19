import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { withProps } from 'recompose'

// Mocked addresses
// Undefined state with started ICO and "Pending" verification status

const ETH = '0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'
const BTC = '0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'

const Addresses = ({ isICOStarted, verifyStatus }) => (
  <div className="Wallets">
    {verifyStatus === 'Declined' ? (
      <div className="addresses declined clear">
        <div className="status-declined">
          <div className="icon" />
          <p>
            In order to participate in JNT Token Sale,
            <br />
            please, contact Jibrel Team via email
            <a style={{ marginLeft: 5 }} href="mailto:sale@jibrel.network">
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
          <div className="value">{ETH}</div>
        </div>
        <div className="item">
          <div className="img btc" />
          <div className="title">BTC address for participate</div>
          <div className="value">{BTC}</div>
        </div>
      </div>
    ) : (
      <div className="addresses declined clear">
        <div className="info-block ico-waiting">
          <div className="icon" />
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
  isICOStarted: PropTypes.bool.isRequired,
  verifyStatus: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  verifyStatus: state.auth.verifyStatus,
})

const enhance = compose(
  connect(mapStateToProps),
  withProps({ isICOStarted: moment.utc('2017-11-27T12:00') < moment.utc() })
)

export default enhance(Addresses)
