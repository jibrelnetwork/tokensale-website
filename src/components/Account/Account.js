import React from 'react'

import Tokens from '../Welcome/Tokens'
import Benefits from '../Welcome/Benefits'
import Addresses from './Addresses'
import Transactions from './Transactions'
import Modals from '../common/Modals'
import AuthHeader from '../common/AuthHeader'

const { KYCStatusModal, SetAddressModal, SetPasswordModal, WithdrawModal } = Modals

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
    <KYCStatusModal />
    <SetAddressModal />
    <SetPasswordModal />
    <WithdrawModal />
  </div>
)

export default Account
