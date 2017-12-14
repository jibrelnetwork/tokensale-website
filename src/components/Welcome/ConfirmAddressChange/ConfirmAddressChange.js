import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Request from './Request'
import Success from './Success'
import Fail from './Fail'

const ConfirmAddressChange = () => (
  <div className="auth">
    <Switch>
      <Route path="/welcome/change-address-confirm/request/:operationId/:token" component={Request} />
      <Route path="/welcome/change-address-confirm/success" component={Success} />
      <Route path="/welcome/change-address-confirm/fail" component={Fail} />
    </Switch>
  </div>
)

export default ConfirmAddressChange
