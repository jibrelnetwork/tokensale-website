import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Reset from './Reset'
import Change from './Change'
import Sended from './Sended'

const Password = () => (
  <div className="Password">
    <Switch>
      <Route path="/welcome/password/reset" component={Reset} />
      <Route path="/welcome/password/sended" component={Sended} />
      <Route path="/welcome/password/change/:uid/:token" component={Change} />
    </Switch>
  </div>
)

export default Password
