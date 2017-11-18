
import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import Immutable from 'immutable'

import reducer from './reducers'
import { updateRehydrated } from './persist'

export default function configureStore (initialState = Immutable.Map(), onCompletion: ()=>void):any {
  const middleware = [
    thunk,
    promiseMiddleware
  ]

  let composeEnhancers = compose

  if (__DEV__) {
    composeEnhancers =
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose
  }

  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    autoRehydrate()
  )

  const store = createStore(
    reducer(),
    initialState,
    enhancer
  )

  // persistStore(store, { storage: AsyncStorage }, onCompletion)
  persistStore(store, { storage: AsyncStorage }, () => {
    store.dispatch(updateRehydrated(true))
    onCompletion && onCompletion()
  })

  return store
}
