import React from 'react'
import PropTypes from 'prop-types'
// import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Terms from './Terms'
import Account from './Account'
import UserInfo from './UserInfo'
import Document from './Document'
import EmailVerification from './EmailVerification'

const Register = ({ /* match: { url } */ stage }) => (
  <div className="register">
    {stage === 'terms' && <Terms />}
    {stage === 'account' && <Account />}
    {stage === 'document' && <Document />}
    {stage === 'user-info' && <UserInfo />}
    {stage === 'email-verification' && <EmailVerification />}
  </div>
)

Register.propTypes = {
  // match: PropTypes.shape({
  //   url: PropTypes.string.isRequired,
  // }).isRequired,
  stage: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  stage: state.register.stage,
})

export default connect(mapStateToProps)(Register)

// export default Register

// on Router
/*
<Route path={url} exact component={Account} />
<Route path={`${url}/terms`} component={Terms} />
<Route path={`${url}/user-info`} component={UserInfo} />
<Route path={`${url}/documents`} component={Documents} />
<Route path={`${url}/email-verification`} component={EmailVerification} />
*/
