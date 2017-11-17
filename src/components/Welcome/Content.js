import React from 'react'
import { Link } from 'react-router-dom'
import Tokens from './Tokens'
import Timer from './Timer'

const Content = () => (
  <div className="Content">
    <div className="text">
      <h1 style={{ color: 'white' }}>Tokenize Everything</h1>
      <p>Jibrel provides traditional financial assets, as ERC-20 tokens, <br />on the Ethereum blockchain</p>
    </div>
    <Timer />
    <div className="link">
      <Link to="/welcome/register" className="button big">Get Tokens</Link>
    </div>
    <Tokens />
  </div>
)

export default Content
