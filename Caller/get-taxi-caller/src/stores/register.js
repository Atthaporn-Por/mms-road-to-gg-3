import { createAction } from 'redux-actions'
import { fromJS } from 'immutable'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_NEW_USER = 'register/UPDATE_NEW_USER'

// ------------------------------------
// Actions
// ------------------------------------
export const updateNewUser = createAction(UPDATE_NEW_USER)

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_NEW_USER]: (state, { payload }) => {
    return state.set('newUser', fromJS(payload))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  newUser: {
    name: '',
    user: '',
    password: '',
    phone: ''
  }
})

export default function interfaceReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
