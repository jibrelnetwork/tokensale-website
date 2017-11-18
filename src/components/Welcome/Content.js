import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Timer from './Timer'
import Tokens from './Tokens'
import * as actions from '../../actions'

const Content = ({ isAuthorized }) => (
  <div className="Content">
    <div className="text">
      <h1 style={{ color: 'white' }}>Tokenize Everything</h1>
      <p>Jibrel provides traditional financial assets, as ERC-20 tokens, <br />on the Ethereum blockchain</p>
    </div>
    <Timer />
    <div className="link">
      <Link to={isAuthorized ? '/account' : '/welcome/register'} className="button big">Get Tokens</Link>
    </div>
    <Tokens />
  </div>
)

Content.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthorized: !!state.auth.token,
})

const mapDispatchToProps = {
  logout: actions.auth.logout,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content)
