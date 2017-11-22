import { combineReducers } from 'redux-immutable'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    authentication: require('./authentication').default,
    entities:       require('./entities').default,
    interface:      require('./interface').default,
    i18n:           require('./i18n').default,
    persist:        require('./persist').default,
    locations:      require('./locations').default,
    newTransaction: require('./newTransaction').default,
    reservation:    require('./reservation').default,
    mainMap:        require('screens/AuthScreen/screens/MainScreen/actions/mainMap').default,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
