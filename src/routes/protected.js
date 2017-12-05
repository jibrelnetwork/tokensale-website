import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, path, store, ...restProps }) => {
  const isAuthorized = !!store.getState().auth.token
  const isVerified = ['Approved', 'Pending'].includes(store.getState().auth.verifyStatus)
  const notVerified = ['Declined', 'WithoutDocument'].includes(store.getState().auth.verifyStatus)
  const withoutVerification = !store.getState().auth.verifyStatus
  return (
    <Route
      render={(props) => (
        path === '/verify'
          ? isAuthorized && (notVerified || withoutVerification)
            ? <Component {...props} />
            : isAuthorized && isVerified
              ? <Redirect to="/account" />
              : <Redirect to="/welcome/login" />
          : path === '/account'
            ? isAuthorized && (isVerified || notVerified)
              ? <Component {...props} />
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
