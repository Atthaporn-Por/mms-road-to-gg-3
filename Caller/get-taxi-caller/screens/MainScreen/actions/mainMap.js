import { Map, List, fromJS } from 'immutable'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_MAIN_MAP = 'UPDATE_MAIN_MAP'

// ------------------------------------
// Actions
// ------------------------------------
export function updateMainMap (payload) {
  return {
    type    : UPDATE_MAIN_MAP,
    payload
  }
}

export const actions = {
  updateMainMap
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_MAIN_MAP]: (state, { payload }) => {
    return state.merge({
      payload
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  mapRegion: { latitude: 13.7563, longitude: 100.5018, latitudeDelta: 0.1, longitudeDelta: 0.05 },
  pickUpLatLong: { latitude: 13.7563, longitude: 100.5018 },
  dropOffLatLong: { latitude: 13.7563, longitude: 100.5018 }
})

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
