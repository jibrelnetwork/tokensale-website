// @flow

import React from 'react'
import numeral from 'numeral'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
// import { lifecycle } from 'recompose'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

const AVAILABLE = 200 * 1000 * 1000
const INITIAL = 150 * 1000 * 1000

type Props = {
  t: TFunction,
  raised: number,
  raisedPercent: number,
}

const Tokens = ({ t, raised, raisedPercent }: Props) => (
  <div className="Progress">
    <div className="progress">
      <div className="wrap">
        <div className="mark" style={{ left: 0 }}>150M</div>
        <div className="mark" style={{ left: '20%' }}>160M</div>
        <div className="mark" style={{ left: '40%' }}>170M</div>
        <div className="mark" style={{ left: '60%' }}>180M</div>
        <div className="mark" style={{ left: '80%' }}>190M</div>
        <div className="mark" style={{ left: '100%' }}>200M</div>
        <div className="line before" style={{ width: `${raisedPercent + 1}%` }} />
        <div className="line after clear" style={{ width: `${100 - raisedPercent}%` }} />
        <div className="item" style={{ left: `${raisedPercent}%` }}>
          <div className="title">{t('index.tokens.raised')}</div>
          <div className="value">{numeral(raised).format('0,0')}</div>
          <div className="point" />
        </div>
      </div>
    </div>
  </div>
)

const mapStateToProps = ({ tokens }) => {
  const raised = (185 * 1000 * 1000) - tokens.raised // process.env.PROD ? tokens.raised : (tokens.raised + (70 * 1000 * 1000))

  return {
    raised,
    raisedPercent: ((raised - INITIAL) / (AVAILABLE - INITIAL)) * 100,
  }
}

// const mapDispatchToProps = {
//   requestStart: actions.tokens.raisedRequest,
//   cancelRequest: actions.tokens.raisedRequestCancel,
// }

const enhance = compose(
  translate(),
  connect(
    mapStateToProps
    // mapDispatchToProps,
  ),
  // lifecycle({
  //   /* eslint-disable fp/no-this */
  //   componentDidMount() { this.props.requestStart() },
  //   componentWillUnmount() { this.props.cancelRequest() },
  //   /* eslint-disable fp/no-this */
  // })
)

export default enhance(Tokens)
