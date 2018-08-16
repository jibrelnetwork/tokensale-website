// @flow

import React from 'react'
import { connect } from 'react-redux'

import Header from '../common/Header'
import Terms from '../Auth/Verify/Terms'
import Loader from '../Auth/Verify/Loader'
import UserInfo from '../Auth/Verify/UserInfo'
import Document from '../Auth/Verify/Document'
import Progress from '../Auth/Verify/Progress'

import type { State } from '../../modules'

type Props = {
  stage: VerificationStage,
}

const AccountVerifyLayout = ({ stage }: Props) => (
  <div className="Verify inner-page">
    <div className="section start">
      <div className="inner">
        <Header activeLayput="verify" />
        <Progress stage={stage} />
      </div>
    </div>
    <div className="section form">
      <div className="inner">
        {stage === 'terms' && <Terms />}
        {stage === 'user-info' && <UserInfo />}
        {stage === 'document' && <Document />}
        {stage === 'loader' && <Loader />}
      </div>
    </div>
  </div>
)

const mapStateToProps = (state: State): Props => ({
  stage: state.account.verifyStage,
})

export default connect(mapStateToProps)(AccountVerifyLayout)
