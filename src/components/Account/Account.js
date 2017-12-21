import React from 'react'

import { Modals, AuthHeader, BitcoinSuisse, Social } from '../common'
import Tokens from '../Welcome/Tokens'
import Benefits from '../Welcome/Benefits'
import Addresses from './Addresses'
import Transactions from './Transactions'

const { KYCStatusModal, SetAddressModal, WithdrawModal, ChangePasswordModal } = Modals

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
        <Tokens />
      </div>
    </div>
    <Benefits />
    <BitcoinSuisse />
    <Social />
    <ChangePasswordModal />
    <KYCStatusModal />
    <SetAddressModal />
    <WithdrawModal />
  </div>
)

export default Account
