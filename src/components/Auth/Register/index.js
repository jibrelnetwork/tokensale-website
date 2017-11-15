import React from 'react'
import PropTypes from 'prop-types'
// import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Main from './Main'
import Terms from './Terms'
import UserInfo from './UserInfo'
import Identification from './Identification'
import EmailVerification from './EmailVerification'

const Register = ({ /* match: { url } */ stage }) => (
  <div className="register">
    {stage === 'main' && <Main />}
    {stage === 'terms' && <Terms />}
    {stage === 'user-info' && <UserInfo />}
    {stage === 'identification' && <Identification />}
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
<Route path={url} exact component={Main} />
<Route path={`${url}/terms`} component={Terms} />
<Route path={`${url}/user-data`} component={UserData} />
<Route path={`${url}/eth-address`} component={ETHAddress} />
<Route path={`${url}/identification`} component={Identification} />
<Route path={`${url}/email-verification`} component={EmailVerification} />
*/
