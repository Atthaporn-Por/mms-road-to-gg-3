import { createAction } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'

import request from 'utils/request'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_MAIN_MAP = 'mainMap/UPDATE_MAIN_MAP'
export const CLEAR = 'mainMap/CLEAR'
export const UPDATE_PICK_UP = 'mainMap/UPDATE_PICK_UP'
export const UPDATE_DROP_OFF = 'mainMap/UPDATE_DROP_OFF'
export const UPDATE_MAP_ROUTE = 'mainMap/UPDATE_MAP_ROUTE'

// ------------------------------------
// Actions
// ------------------------------------

export const updateMainMap = createAction(UPDATE_MAIN_MAP)
export const clearMainMap = createAction(CLEAR)
export const updatePickUp = createAction(UPDATE_PICK_UP)
export const updateDropOff = createAction(UPDATE_DROP_OFF)
export const updateMapRoute = createAction(UPDATE_MAP_ROUTE)

const getNearbyTaxi = () => {
  return (dispatch, state) => {
    
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const getLatLngKey = (location = Map()) => {
  return fromJS({
    latitude: location.get('lat'),
    longitude: location.get('lng')
  })
}

const changeLatLngKey = (details) => (
  details.updateIn(['geometry', 'location'], location => {
    return getLatLngKey(location)
  })
)

const ACTION_HANDLERS = {
  [UPDATE_MAIN_MAP]: (state, { payload }) => {
    return state.mergeDeep({
      payload
    })
  },
  [CLEAR]: (state, { payload }) => {
    return initialState
  },
  [UPDATE_PICK_UP]: (state, { payload }) => {
    return state.set('pick_up', changeLatLngKey(fromJS(payload)))
  },
  [UPDATE_DROP_OFF]: (state, { payload }) => {
    return state.set('drop_off', changeLatLngKey(fromJS(payload)))
  },
  [UPDATE_MAP_ROUTE]: (state, { payload }) => {
    return state.set('map_route', fromJS(payload))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  mapRegion: { latitude: 13.7563, longitude: 100.5018, latitudeDelta: 0.1, longitudeDelta: 0.05 },
  pick_up: {
    // geometry: { location: { lat: 13.8563, lng: 100.6018 } }
  },
  drop_off: {
    // geometry: { location: { lat: 13.7563, lng: 100.5018 } }
  },
  map_route: {

  }
})

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
