import React from 'react'
// import axios from 'axios'
import numeral from 'numeral'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import * as actions from '../../actions'
// import { SERVER } from '../../sagas'

const Tokens = ({ raised, available }) => (
  <div className="Progress">
    <div className="progress">
      <div className="line clear" style={{ width: `${100 - ((raised / available) * 100)}%` }}>
        <div className="item raised">
          <div className="title">Raised Tokens</div>
          <div className="value">{numeral(raised).format('0,0')}</div>
          <div className="point" />
        </div>
      </div>
      <div className="item total">
        <div className="title">Available Tokens</div>
        <div className="value">{numeral(available).format('0,0')}</div>
        <div className="point" />
      </div>
    </div>
  </div>
)

Tokens.propTypes = {
  raised: PropTypes.number.isRequired,
  available: PropTypes.number,
}

Tokens.defaultProps = {
  available: 120000000,
}

const mapStateToProps = (state) => ({
  raised: state.tokens.raised,
})

const mapDispatchToProps = {
  getRaised: actions.tokens.raisedRequest,
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.getRaised() // eslint-disable-line fp/no-this
    },
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
