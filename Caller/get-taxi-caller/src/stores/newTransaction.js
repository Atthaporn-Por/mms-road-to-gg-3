import { createAction } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'

import request from 'utils/request'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_PICK_UP = 'mainMap/UPDATE_PICK_UP'
export const UPDATE_DROP_OFF = 'mainMap/UPDATE_DROP_OFF'

// ------------------------------------
// Actions
// ------------------------------------
export const updatePickUp = createAction(UPDATE_PICK_UP)
export const updateDropOff = createAction(UPDATE_DROP_OFF)

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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_PICK_UP]: (state, { payload }) => {
    return state.set('pick_up', changeLatLngKey(fromJS(payload)))
  },
  [UPDATE_DROP_OFF]: (state, { payload }) => {
    return state.set('drop_off', changeLatLngKey(fromJS(payload)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  pick_up: {
    // geometry: { location: { lat: 13.8563, lng: 100.6018 } }
  },
  drop_off: {
    // geometry: { location: { lat: 13.7563, lng: 100.5018 } }
  }
})

export default function interfaceReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
