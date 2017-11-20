import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Sended from './Sended'
import Pending from './Pending'
import Verified from './Verified'
import Declined from './Declined'

const Email = () => (
  <Switch>
    <Route path="/welcome/email/sended" component={Sended} />
    <Route path="/welcome/email/pending/:key" component={Pending} />
    <Route path="/welcome/email/verified" component={Verified} />
    <Route path="/welcome/email/declined" component={Declined} />
  </Switch>
)

export default Email
