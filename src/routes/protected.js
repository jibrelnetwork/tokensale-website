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
              ? <Redirect to="/account" />
              : <Redirect to="/welcome/login" />
          : path === '/account'
            ? isAuthorized && isVerified
              ? <Component {...props} />
              : isAuthorized && !isVerified
                ? <Redirect to="/verify" />
                : !isAuthorized && isVerified
                  ? <Redirect to="/welcome/login" />
                  : <Redirect to="/welcome/login" />
            : <Redirect to="/welcome" />
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
