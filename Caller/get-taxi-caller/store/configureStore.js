
import { AsyncStorage } from 'react-native'
import devTools from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import Immutable from 'immutable'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

import reducer from './reducers'

export default function configureStore (initialState = Immutable.Map(), onCompletion: ()=>void):any {
  const middleware = [
    logger,
    thunk
  ]

  // let enhancer
  // if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  //   enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
  //     applyMiddleware(...middleware)
  //   )
  // } else {
  //   enhancer = compose(
  //     applyMiddleware(...middleware),
  //     DevTools.instrument(),
  //     autoRehydrate(),
  //     persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  //   )
  // }
  // store = createStore(
  //   reducer,
  //   initialState,
  //   enhancer
  // )

  // const enhancer = compose(
  //   // composeWithDevTools(
  //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
  //     applyMiddleware(...middleware)
  //   ),
  //   autoRehydrate(),
  //   devTools({
  //     name: 'nativestarterkit', realtime: true
  //   })
  // )

  const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(...middleware),
    autoRehydrate()
  )

  const store = createStore(reducer(), initialState, enhancer)
  persistStore(store, { storage: AsyncStorage }, onCompletion)

  return store
}
