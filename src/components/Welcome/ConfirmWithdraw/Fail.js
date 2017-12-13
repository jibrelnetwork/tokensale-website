import React from 'react'
import { Link } from 'react-router-dom'

const Fail = () => (
  <div className="withdraw-confirm">
    <div className="img fail" />
    <p>We can&apos;t confirm your JNT withdraw, please try again later or contact us via email</p>
    <Link to="/account" className="button">Go to dashboard</Link>
  </div>
)

export default Fail
