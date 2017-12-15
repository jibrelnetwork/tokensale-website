import React from 'react'
import { get } from 'lodash/fp'
import { Link } from 'react-router-dom'

const Fail = (props) => (
  <div className="address-change-confirm">
    <div className="img fail" />
    <p>
      {get(['location', 'state', 'message'], props) ||
      "We can't confirm your ETH address change, please try again later or contact us via email"}
    </p>
    <Link to="/account" replace className="button">Go to dashboard</Link>
  </div>
)

export default Fail
