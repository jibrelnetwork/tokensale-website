import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import { Route, Redirect, Switch } from 'react-router-dom'
import { reducer as formReducer } from 'redux-form'
import { PersistGate } from 'redux-persist/es/integration/react'
import createHistory from 'history/createHashHistory'
import { Provider } from 'react-redux'
import storage from 'redux-persist/es/storage'
import LogRocket from 'logrocket'

import './styles/core.scss'
import sagas from './sagas'
import reducers from './reducers'
import middlewares from './middlewares'
import { ProtectedRoute } from './routes'
import { Auth, Welcome, Account } from './components'
import ga from './services/ga'

LogRocket.init('pnojyg/jibrel')

const history = createHistory()
const persistReducer = { key: 'root', storage }
const routeMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const logRocketMiddleware = LogRocket.reduxMiddleware()

const persistedReducers = persistCombineReducers(
  persistReducer, {
    ...reducers,
    form: formReducer,
    router: routerReducer,
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
    </PersistGate>
  </Provider>,
  document.getElementById('container')
)

// Initialise google analytics data: id & utm parameters
ga.init()
