import React from 'react'
import { Link } from 'react-router-dom'

const Loader = () => (
  <div className="Loader">
    <div className="loader-content">
      <div className="loader">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
    <div className="status">
      <div className="item item-1">Uploading document to KYC servers</div>
      <div className="item item-2">Scanning document for key information</div>
      <div className="item item-3">Checking document validity</div>
      <div className="item item-4">Processing and cleaning information</div>
      <div className="item item-5">Checking OFAC, sanction and watch lists</div>
      <div className="item item-6">Final decision-making</div>
    </div>
    <div className="message done">
      <div className="img" />
      <p>Your identity has been verified <br />and your application has been approved</p>
      <Link to="/account" className="button bordered">Go to dashboard</Link>
    </div>
    <div className="message" style={{ display: 'none' }}>
      <div className="img" />
      <p>
        We are currently processing your application.
        <br />
        Please note, we may request that you submit additional identity verification in the future
      </p>
    </div>
  </div>
)

export default Loader
