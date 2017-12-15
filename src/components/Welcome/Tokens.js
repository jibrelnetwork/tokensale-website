import React from 'react'
import numeral from 'numeral'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { translate } from 'react-i18next'

import * as actions from '../../actions'

const AVAILABLE = 200000000

const Tokens = ({ t, raised, raisedPercent }) => (
  <div className="Progress">
    <div className="progress">
      <div className="wrap">
        <div className="line before" style={{ width: `${raisedPercent + 1}%` }} />
        <div className="line after clear" style={{ width: `${100 - raisedPercent}%` }}>
          <div className="item raised">
            <div className="title">{t('index.tokens.raised')}</div>
            <div className="value">{numeral(raised).format('0,0')}</div>
            <div className="point" />
          </div>
        </div>
        <div className="item total">
          <div className="title">Total Supply</div>
          <div className="value">{numeral(AVAILABLE).format('0,0')}</div>
          <div className="point" />
        </div>
      </div>
    </div>
  </div>
)

Tokens.propTypes = {
  t: PropTypes.func.isRequired,
  raised: PropTypes.number.isRequired,
  raisedPercent: PropTypes.number.isRequired,
}

const mapStateToProps = ({ tokens: { raised } }) => ({
  raised,
  raisedPercent: (raised / AVAILABLE) * 100,
})

const mapDispatchToProps = {
  requestStart: actions.tokens.raisedRequest,
  cancelRequest: actions.tokens.raisedRequestCancel,
}

const enhance = compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    /* eslint-disable fp/no-this */
    componentDidMount() { this.props.requestStart() },
    componentWillUnmount() { this.props.cancelRequest() },
    /* eslint-disable fp/no-this */
  })
)

export default enhance(Tokens)
