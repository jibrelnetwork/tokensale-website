// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import LogRocket from 'logrocket'
import Promise from 'promise-polyfill'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { I18nextProvider } from 'react-i18next'

import { createStore, applyMiddleware } from 'redux'
import { Route, /* Redirect, */ Switch } from 'react-router-dom'
import { get, set, compose, update, curry, isString } from 'lodash/fp'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'

import './styles/core.scss'
import i18n from './locale'
import sagas from './sagas'
import { modulesReducer } from './modules'
// import middlewares from './middlewares'
// import tracking from './services/tracking'
// import { Auth, Welcome, Account } from './components'
import { JModals } from './components/Modals'
import { WelcomeLayout, AccountVerifyLayout, EmailVerifyLayout } from './components/Layout'


import R from './routes.yaml'

if (!window.Promise) {
  window.Promise = Promise // eslint-disable-line fp/no-mutation
}

const clean = curry((path, object) => get(path, object) ? set(path, null, object) : object)

LogRocket.init('pnojyg/jibrel-sale', {
  network: {
    responseSanitizer: compose(
      clean(['body', 'key']),
      update('body', (body) => body && isString(body) ? JSON.parse(body) : {}),
    ),
    requestSanitizer: compose(
      clean(['body', 'password']),
      clean(['body', 'old_password']),
      clean(['body', 'new_password1']),
      clean(['body', 'new_password2']),
      clean(['body', 'password_confirm']),
      clean(['headers', 'Authorization']),
      update('body', (body) => body && isString(body) ? JSON.parse(body) : {}),
    ),
  },
})

const history = createBrowserHistory()
const routeMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
// const logRocketMiddleware = LogRocket.reduxMiddleware({
//   actionSanitizer: (action) => action.type.match('@@redux-form')
//     ? null
//     : compose(
//       clean(['payload', 'token']),
//       clean(['payload', 'password']),
//       clean(['payload', 'newPassword']),
//       clean(['payload', 'passwordConfirm']),
//       clean(['payload', 'newPasswordConfirm']),
//     )(action),
//   stateSanitizer: compose(
//     clean(['auth', 'token']),
//     clean(['form', 'login', 'values', 'password']),
//     clean(['form', 'register', 'values', 'password']),
//     clean(['form', 'register', 'values', 'passwordConfirm']),
//     clean(['form', 'set-password', 'values', 'password']),
//     clean(['form', 'set-password', 'values', 'newPassword']),
//     clean(['form', 'set-password', 'values', 'newPasswordConfirm']),
//     clean(['form', 'change-password', 'values', 'newPassword']),
//     clean(['form', 'change-password', 'values', 'newPasswordConfirm']),
//   ),
// })

const store = createStore(
  connectRouter(history)(modulesReducer),
  // process.env.DEV &&
  /* eslint-disable no-underscore-dangle, more/no-window */
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__(),
  /* eslint-enable */
  applyMiddleware(
    // ...middlewares,
    sagaMiddleware,
    routeMiddleware,
    // logRocketMiddleware,
  )
)

sagaMiddleware.run(sagas)

const rootElement: HTMLElement = document.getElementById('container')

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            {/* <Redirect exact from="/" to="/welcome" />
            <ProtectedRoute
              path="/verify"
              store={store}
              component={Auth.Verify}
            />
             <ProtectedRoute
              path="/account"
              store={store}
              component={Account}
            /> */}
            <Route {...R.VERIFY} component={AccountVerifyLayout} />
            <Route {...R.VERIFY_EMAIL_ROOT} component={EmailVerifyLayout} />
            <Route exact {...R.ROOT} component={WelcomeLayout} />
          </Switch>
          <JModals />
          <ToastContainer
            type="error"
            position="top-center"
            autoClose={2500}
            newestOnTop
            closeButton={false}
            closeOnClick
            pauseOnHover
            hideProgressBar
          />
        </div>
      </ConnectedRouter>
    </I18nextProvider>
  </Provider>,
  rootElement
)

// Initialize google analytics data: id & utm parameters
// tracking.init()
