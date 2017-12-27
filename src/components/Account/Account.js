import React from 'react'

import { Modals, AuthHeader, Social } from '../common'
import Benefits from '../Welcome/Benefits'
import Transactions from './Transactions'

const { KYCStatusModal, ChangePasswordModal } = Modals

const Account = () => (
  <div className="Account inner-page">
    <div className="section start">
      <div className="inner">
        <AuthHeader isAccountPage />
      </div>
    </div>
    <div className="section content">
      <div className="inner">
        <Transactions />
      </div>
    </div>
    <Benefits />
    <Social />
    <ChangePasswordModal />
    <KYCStatusModal />
  </div>
)

export default Account
