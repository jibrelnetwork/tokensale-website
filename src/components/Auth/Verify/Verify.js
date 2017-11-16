import React from 'react'
import PropTypes from 'prop-types'
// import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Terms from './Terms'
import UserInfo from './UserInfo'
import Document from './Document'
import Progress from './Progress'

const Verify = ({ /* match: { url } */ stage }) => (
  <div className="Verify">
    <Progress stage={stage} />
    <div className="section form">
      <div className="inner">
        {stage === 'terms' && <Terms />}
        {stage === 'document' && <Document />}
        {stage === 'user-info' && <UserInfo />}
      </div>
    </div>
  </div>
)

Verify.propTypes = {
  // match: PropTypes.shape({
  //   url: PropTypes.string.isRequired,
  // }).isRequired,
  stage: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  stage: state.verify.stage,
})

export default connect(mapStateToProps)(Verify)

// export default Verify

// on Router
/*
<Route path={url} exact component={Terms} />
<Route path={`${url}/document`} component={Document} />
<Route path={`${url}/user-info`} component={UserInfo} />
*/
