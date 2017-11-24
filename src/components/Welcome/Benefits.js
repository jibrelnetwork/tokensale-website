import React from 'react'

const Benefits = () => (
  <div className="section benefits">
    <div className="inner">
      <div className="row clear">
        <div className="col-3 benefit-1">
          <div className="img">
            <img src="/static/icons/benefit-1.svg" alt="" />
          </div>
          <h3>USD $0.25</h3>
          <p>Price of the token</p>
        </div>
        <div className="col-3 benefit-2">
          <div className="img">
            <img src="/static/icons/benefit-2.svg" alt="" />
          </div>
          <h3>Ethereum, Bitcoin</h3>
          <p>Accepted currencies</p>
        </div>
        <div className="col-3 benefit-3">
          <div className="img">
            <img src="/static/icons/benefit-3.svg" alt="" />
          </div>
          <h3>Feb 1st 2017</h3>
          <p>Tokens will be listed</p>
        </div>
        <div className="col-3 benefit-4">
          <div className="img">
            <img src="/static/icons/benefit-4.svg" alt="" />
          </div>
          <h3>USA</h3>
          <p>Forbidden country</p>
        </div>
      </div>
    </div>
  </div>
)

export default Benefits
