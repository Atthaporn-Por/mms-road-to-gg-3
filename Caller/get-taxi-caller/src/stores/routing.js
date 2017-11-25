import Immutable from 'immutable'

// ------------------------------------
// CONSTANTS
// ------------------------------------

export const UPDATE_REDIRECT_URL = 'UPDATE_REDIRECT_URL'

// ------------------------------------
// Actions
// ------------------------------------
export function updateRedirectUrl (location = '/') {
  return {
    type    : UPDATE_REDIRECT_URL,
    payload : location
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null
})

export default (state = initialState, action) => {
  if (action.type === UPDATE_REDIRECT_URL) {
    return state.set('redirectURL', action.payload)
  }

  return state
}
