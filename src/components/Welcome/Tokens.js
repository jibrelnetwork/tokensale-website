import React from 'react'
// import axios from 'axios'
import numeral from 'numeral'
import PropTypes from 'prop-types'
import { lifecycle } from 'recompose'

const Tokens = ({ raised, available }) => (
  <div className="Progress">
    <div className="progress">
      <div className="line clear">
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
  raised: PropTypes.number,
  available: PropTypes.number,
}

Tokens.defaultProps = {
  raised: 12000000,
  available: 120000000,
}

const enhance = lifecycle({
  state: { raised: undefined },
  async componentDidMount() {
    try {
      // const response = await axios.get('https://example.com')
      // const { raised } = await response.data.raised
      // this.setState({ raised }) // eslint-disable-line react/no-did-mount-set-state, fp/no-this
    } catch (error) {
      console.log(`Raised tokens request error: ${error}`)
    }
  },
})

export default enhance(Tokens)
