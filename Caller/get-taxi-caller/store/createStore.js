import Immutable from 'immutable'
import Raven from 'raven-js'
import thunk from 'redux-thunk'

import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'

import makeRootReducer from './reducers'

import { updateRehydrated } from './persist'

export default (initialState = Immutable.Map()) => {
  Raven.config(process.env.SENTRY_DSN).install()
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, routerMiddleware(browserHistory)]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      autoRehydrate(),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
      return state.get('routing').toJS()
    }
  })

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  persistStore(store, { whitelist: ['authentication', 'i18n'] }, () => {
    store.dispatch(updateRehydrated(true))
  })

  return store
}
