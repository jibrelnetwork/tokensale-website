import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Terms from './Terms'
import Header from './Header'
import Loader from './Loader'
import UserInfo from './UserInfo'
import Document from './Document'
import Progress from './Progress'

const Verify = ({ stage, token }) => (
  <div className="Verify">
    <div className="section start">
      <div className="inner">
        <Header />
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

Verify.propTypes = {
  stage: PropTypes.oneOf(['terms', 'loader', 'document', 'user-info']).isRequired,
  token: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  stage: state.verify.stage,
  token: state.auth.token,
})

export default connect(mapStateToProps)(Verify)
