import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => (
  <div className="withdraw-confirm">
    <div className="img success" />
    <p>Your JNT withdraw confirmed successfully!</p>
    <Link to="/account" replace className="button">Go to dashboard</Link>
  </div>
)

export default Success
