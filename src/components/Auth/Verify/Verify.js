// @flow

import React from 'react'
import { connect } from 'react-redux'

import Header from '../../common/Header'
import Terms from './Terms'
import Loader from './Loader'
import UserInfo from './UserInfo'
import Document from './Document'
import Progress from './Progress'

import type { State } from '../../../modules'
import type { VerificationStage } from '../../../modules/auth'

type Props = {
  stage: VerificationStage,
}

const Verify = ({ stage }: Props) => (
  <div className="Verify inner-page">
    <div className="section start">
      <div className="inner">
        <Header />
        <Progress stage={stage} />
      </div>
    </div>
    <div className="section form">
      <div className="inner">
        {stage === 'terms' && <Terms />}
        {stage === 'loader' && <Loader />}
        {stage === 'document' && <Document />}
        {stage === 'user-info' && <UserInfo />}
      </div>
    </div>
  </div>
)

const mapStateToProps = (state: State): Props => ({
  stage: state.auth.verifyStage,
})

export default connect(mapStateToProps)(Verify)
