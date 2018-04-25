import React from 'react'
import ReactDOM from 'react-dom'
import LogRocket from 'logrocket'
import Promise from 'promise-polyfill'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/es/storage'
import createHistory from 'history/createHashHistory'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { I18nextProvider } from 'react-i18next'
import { reducer as formReducer } from 'redux-form'
import { createStore, applyMiddleware } from 'redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/es/integration/react'
import { get, set, compose, update, curry, isString } from 'lodash/fp'
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import './styles/core.scss'
import i18n from './locale'
import sagas from './sagas'
import reducers from './reducers'
import middlewares from './middlewares'
import tracking from './services/tracking'
import { ProtectedRoute } from './routes'
import { Auth, Welcome, Account } from './components'

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

const rootPersistConfig = {
  storage,
  key: 'root',
  blacklist: ['account'],
}

const accountPersistConfig = {
  storage,
  key: 'account',
  blacklist: ['modals'],
}

const history = createHistory()
const routeMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const logRocketMiddleware = LogRocket.reduxMiddleware({
  actionSanitizer: (action) => action.type.match('@@redux-form')
    ? null
    : compose(
      clean(['payload', 'token']),
      clean(['payload', 'password']),
      clean(['payload', 'newPassword']),
      clean(['payload', 'passwordConfirm']),
      clean(['payload', 'newPasswordConfirm']),
    )(action),
  stateSanitizer: compose(
    clean(['auth', 'token']),
    clean(['form', 'login', 'values', 'password']),
    clean(['form', 'register', 'values', 'password']),
    clean(['form', 'register', 'values', 'passwordConfirm']),
    clean(['form', 'set-password', 'values', 'password']),
    clean(['form', 'set-password', 'values', 'newPassword']),
    clean(['form', 'set-password', 'values', 'newPasswordConfirm']),
    clean(['form', 'change-password', 'values', 'newPassword']),
    clean(['form', 'change-password', 'values', 'newPasswordConfirm']),
  ),
})

const { auth, verify, tokens, account } = reducers

const persistedReducers = persistCombineReducers(
  rootPersistConfig, {
    auth,
    verify,
    tokens,
    form: formReducer,
    router: routerReducer,
    account: persistReducer(accountPersistConfig, account),
  }
)

const store = createStore(
  persistedReducers,
  process.env.DEV &&
  /* eslint-disable no-underscore-dangle, more/no-window */
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__(),
  /* eslint-enable */
  applyMiddleware(
    ...middlewares,
    sagaMiddleware,
    routeMiddleware,
    logRocketMiddleware,
  )
)

const persistor = persistStore(store)

sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <PersistGate persistor={persistor} loading={null}>
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Redirect exact from="/" to="/welcome" />
              <Route path="/welcome" component={Welcome} />
              <ProtectedRoute
                path="/verify"
                store={store}
                component={Auth.Verify}
              />
              <ProtectedRoute
                path="/account"
                store={store}
                component={Account}
              />
              <Redirect from="*" to="/welcome" />
            </Switch>
          </div>
        </ConnectedRouter>
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
      </PersistGate>
    </I18nextProvider>
  </Provider>,
  document.getElementById('container')
)

// Initialize google analytics data: id & utm parameters
tracking.init()
