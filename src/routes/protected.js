import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, path, store, ...restProps }) => {
  const { token, verifyStatus } = store.getState().auth
  const isAuthorized = !!token
  const withoutVerification = !verifyStatus
  const isVerified = ['Approved', 'Preliminarily Approved'].includes(verifyStatus)
  return (
    <Route
      render={(props) => (
        path === '/verify'
          ? isAuthorized && (!isVerified || withoutVerification)
            ? <Component {...props} />
            : isAuthorized && isVerified
              ? <Redirect to="/account" />
              : <Redirect to="/welcome/login" />
          : path === '/account'
            ? isAuthorized
              ? withoutVerification
                ? <Redirect to="/verify" />
                : <Component {...props} />
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
