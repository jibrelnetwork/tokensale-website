// @flow

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Sended from './Sended'
import Pending from './Pending'
import Verified from './Verified'
import Declined from './Declined'

import R from '../../../routes.yaml'

const Email = () => (
  <div className="auth">
    <Switch>
      <Route {...R.VERIFY_EMAIL_SENDED} component={Sended} />
      <Route {...R.VERIFY_EMAIL_PENDING} component={Pending} />
      <Route {...R.VERIFY_EMAIL_VERIFIED} component={Verified} />
      <Route {...R.VERIFY_EMAIL_DECLINED} component={Declined} />
    </Switch>
  </div>
)

export default Email
