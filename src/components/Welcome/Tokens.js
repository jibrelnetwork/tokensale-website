import React from 'react'
// import axios from 'axios'
import numeral from 'numeral'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import * as actions from '../../actions'
// import { SERVER } from '../../sagas'

const AVAILABLE = 200000000

const Tokens = ({ raised }) => (
  <div className="Progress">
    <div className="progress">
      <div className="wrap">
        <div className="line clear" style={{ width: `${100 - ((raised / AVAILABLE) * 100)}%` }}>
          <div className="item raised">
            <div className="title">Raised Tokens</div>
            <div className="value">{numeral(raised).format('0,0')}</div>
            <div className="point" />
          </div>
        </div>
        <div className="item total">
          <div className="title">Available Tokens</div>
          <div className="value">{numeral(AVAILABLE - raised).format('0,0')}</div>
          <div className="point" />
        </div>
      </div>
    </div>
  </div>
)

Tokens.propTypes = {
  raised: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  raised: state.tokens.raised,
})

const mapDispatchToProps = {
  requestStart: actions.tokens.raisedRequest,
  cancelRequest: actions.tokens.raisedRequestCancel,
}

const enhance = compose(
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
  // withState('raised', 'setRaised', 12000000),
  // lifecycle({
  //   async componentDidMount() {
  //     try {
  //       const response = await axios.get(`${SERVER}/api/raised-tokens/`)
  //       const { raised } = response.data.raised_tokens
  //       this.props.setRaised(raised) // eslint-disable-line react/no-did-mount-set-state, fp/no-this
  //     } catch (error) {
  //       console.log(`Raised tokens request error: ${error}`)
  //     }
  //   },
  // })
)

export default enhance(Tokens)
