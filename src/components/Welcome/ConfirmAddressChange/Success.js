import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => (
  <div className="address-change-confirm">
    <div className="img success" />
    <p>Your ETH address changed successfully!</p>
    <Link to="/account" className="button">Go to dashboard</Link>
  </div>
)

export default Success
