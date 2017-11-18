import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, path, store, ...restProps }) => {
  const authorized = !!store.getState().auth.token
  const verified = !!store.getState().auth.verifyStatus
  return (
    <Route
      render={(props) => (
        path === '/verify'
          ? authorized && !verified
            ? <Component {...props} />
            : authorized && verified
              ? <Redirect to={{ pathname: '/account' }} />
              : <Redirect to={{ pathname: '/welcome/login' }} />
          : path === '/account'
            ? authorized && verified
              ? <Component {...props} />
              : authorized && !verified
                ? <Redirect to={{ pathname: '/verify' }} />
                : !authorized && verified
                  ? <Redirect to={{ pathname: '/welcome/login' }} />
                  : <Redirect to={{ pathname: '/welcome/login' }} />
            : <Redirect to={{ pathname: '/welcome' }} />
      )}
      {...restProps}
    />
  )
}

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
}

export default ProtectedRoute
