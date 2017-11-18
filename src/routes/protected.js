import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, path, store, ...restProps }) => {
  const isAuthorized = !!store.getState().auth.token
  const isVerified = !!store.getState().auth.verifyStatus
  return (
    <Route
      render={(props) => (
        path === '/verify'
          ? isAuthorized && !isVerified
            ? <Component {...props} />
            : isAuthorized && isVerified
              ? <Redirect to={{ pathname: '/account' }} />
              : <Redirect to={{ pathname: '/welcome/login' }} />
          : path === '/account'
            ? isAuthorized && isVerified
              ? <Component {...props} />
              : isAuthorized && !isVerified
                ? <Redirect to={{ pathname: '/verify' }} />
                : !isAuthorized && isVerified
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
