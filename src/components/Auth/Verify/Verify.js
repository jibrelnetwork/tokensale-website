import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Terms from './Terms'
import Header from './Header'
import Loader from './Loader'
import UserInfo from './UserInfo'
import Document from './Document'
import Progress from './Progress'

const Verify = ({ stage }) => (
  <div className="Verify">
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

Verify.propTypes = {
  stage: PropTypes.oneOf(['terms', 'loader', 'document', 'user-info']).isRequired,
}

const mapStateToProps = (state) => ({
  stage: state.verify.stage,
})

export default connect(mapStateToProps)(Verify)
