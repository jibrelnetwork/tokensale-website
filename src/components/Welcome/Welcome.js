import React from 'react'
import { Route } from 'react-router-dom'
import Benefits from './Benefits'
import Content from './Content'
import Header from './Header'
import * as Auth from '../Auth';

const Welcome = () => (
  <div className="Welcome">
    <div className="section start">
      <div className="bg-1" />
      <div className="bg-2" />
      <div className="inner">
        <Header />
        <Route path="/welcome" exact component={Content} />
      </div>
      <Route path="/welcome/login" component={Auth.Login} />
      <Route path="/welcome/register" component={Auth.Register} />
    </div>
    <Benefits />
  </div>
)

export default Welcome
