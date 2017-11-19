import React from 'react'
import Header from './Header'
import Tokens from '../Welcome/Tokens'
import Benefits from '../Welcome/Benefits'
import Addresses from './Addresses'
import Transactions from './Transactions'

const Account = () => (
  <div className="Account">
    <div className="section start">
      <div className="inner">
        <Header />
      </div>
    </div>
    <div className="section content">
      <div className="inner">
        <Addresses />
        <Transactions />
        <Tokens />
      </div>
    </div>
    <Benefits />
  </div>
)

export default Account
