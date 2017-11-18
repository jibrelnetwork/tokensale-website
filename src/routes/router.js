import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ component: Component, store, ...restProps }) => (
  <Route
    render={(props) => (
      store.getState().auth.token ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/welcome/login' }} />
      )
    )}
    {...restProps}
  />
)
