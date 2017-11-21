import React from 'react'
import { Link } from 'react-router-dom'

const Verified = () => (
  <div className="Verified">
    <div className="email-verification">
      <div className="img verified" />
      <p>
        Your email has been verified <br />
        and your can login now!
      </p>
      <Link to="/welcome/login" className="button">Login</Link>
    </div>
  </div>
)

export default Verified
