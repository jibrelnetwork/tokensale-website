import React from 'react'
import { Link } from 'react-router-dom'

const Sended = () => (
  <div className="email-verification">
    <div className="img sended" />
    <p>
      {'An email has been sent to your email address. It can take a few minutes before you have ' +
        'it in your inbox. Click the activation link to verify your account!'}
    </p>
    <Link to="/verify" className="button">Continue</Link>
  </div>
)

export default Sended
