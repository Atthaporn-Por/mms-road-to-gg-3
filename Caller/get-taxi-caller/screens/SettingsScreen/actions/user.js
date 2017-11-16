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
    return state.mergeDeep({
      payload
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  favorite_places: [{
    description: 'Work',
    geometry: { location: { lat: 13.7563, lng: 100.5018 } }
  }, {
    description: 'Home',
    geometry: { location: { lat: 13.8563, lng: 100.6018 } }
  }]
})

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
