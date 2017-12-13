import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Request from './Request'
import Success from './Success'
import Fail from './Fail'

const ConfirmWithdraw = () => (
  <div className="auth">
    <Switch>
      <Route path="/welcome/withdraw-confirm/request/:operationId/:token" component={Request} />
      <Route path="/welcome/withdraw-confirm/success" component={Success} />
      <Route path="/welcome/withdraw-confirm/fail" component={Fail} />
    </Switch>
  </div>
)

export default ConfirmWithdraw
