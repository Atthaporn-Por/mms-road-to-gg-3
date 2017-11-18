import Immutable from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

export { push } from 'react-router-redux'

// ------------------------------------
// CONSTANTS
// ------------------------------------

export const UPDATE_REDIRECT_URL = 'UPDATE_REDIRECT_URL'

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange (location = '/') {
  return {
    type    : LOCATION_CHANGE,
    payload : location
  }
}

export function updateRedirectUrl (location = '/') {
  return {
    type    : UPDATE_REDIRECT_URL,
    payload : location
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null
})

export default (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set('locationBeforeTransitions', action.payload)
  }
  else if (action.type === UPDATE_REDIRECT_URL) {
    return state.set('redirectURL', action.payload)
  }

  return state
}
