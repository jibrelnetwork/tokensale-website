// @flow

import React from 'react'
import { connect } from 'react-redux'

import { AuthHeader } from '../../common'
import Terms from './Terms'
import Loader from './Loader'
import UserInfo from './UserInfo'
import Document from './Document'
import Progress from './Progress'

import type { State } from '../../../modules'
import type { VerificationStage } from '../../../modules/auth'

type Props = {
  stage: VerificationStage,
  token: ?string,
}

const Verify = ({ stage, token }: Props) => (
  <div className="Verify inner-page">
    <div className="section start">
      <div className="inner">
        <AuthHeader />
        <Progress stage={stage} />
      </div>
    </div>
    <div className="section form">
      <div className="inner">
        {stage === 'terms' && <Terms id={token} />}
        {stage === 'loader' && <Loader id={token} />}
        {stage === 'document' && <Document id={token} />}
        {stage === 'user-info' && <UserInfo id={token} />}
      </div>
    </div>
  </div>
)

const mapStateToProps = (state: State): Props => ({
  stage: state.auth.verifyStage,
  token: state.auth.token,
})

export default connect(mapStateToProps)(Verify)
