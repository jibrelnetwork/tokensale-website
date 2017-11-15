import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import { reducer as formReducer } from 'redux-form'
import { FocusStyleManager } from '@blueprintjs/core';
import { PersistGate } from 'redux-persist/es/integration/react'
import createHistory from 'history/createHashHistory'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import storage from 'redux-persist/es/storage'

import '@blueprintjs/datetime/dist/blueprint-datetime.css'
import '@blueprintjs/labs/dist/blueprint-labs.css'
import '@blueprintjs/core/dist/blueprint.css'
import './styles/normalize.css'

import reducers from './reducers'
import middlewares from './middlewares';
import sagas from './sagas';
import { Auth, Main } from './components';

FocusStyleManager.onlyShowFocusOnTabs();

const history = createHistory()
const persistReducer = { key: 'root', storage }
const routeMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

const persistedReducers = persistCombineReducers(
  persistReducer, {
    ...reducers,
    form: formReducer,
    router: routerReducer,
  }
);

const store = createStore(
  persistedReducers,
  // eslint-disable-next-line no-underscore-dangle, more/no-window
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    ...middlewares,
    sagaMiddleware,
    routeMiddleware
  )
)

const persistor = persistStore(store)

sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <ConnectedRouter history={history}>
        <div>
          <Route path="/" exact component={Main} />
          <Route path="/register" component={Auth.Register} />
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
