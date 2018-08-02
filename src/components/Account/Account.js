import React from 'react'

import { AuthHeader, Social } from '../common'
import Benefits from '../Welcome/Benefits'
import Transactions from './Transactions'
import Addresses from './Addresses'

const Account = () => (
  <div className="Account inner-page">
    <div className="section start">
      <div className="inner">
        <AuthHeader isAccountPage />
      </div>
    </div>
    <div className="section content">
      <div className="inner">
        <Addresses />
        <Transactions />
      </div>
    </div>
    <Benefits />
    <Social />
  </div>
)

export default Account
