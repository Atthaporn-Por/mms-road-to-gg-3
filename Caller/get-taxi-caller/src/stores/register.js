import { createAction } from 'redux-actions'
import { fromJS } from 'immutable'
import { NavigationActions } from 'react-navigation'

import request from 'utils/request'

import { updateCurrentUser } from './authentication'

// ------------------------------------
// Constants
// ------------------------------------
const UPDATE_NEW_USER = 'register/UPDATE_NEW_USER'
const LOADING = 'register/LOADING'
const CLEAR = 'register/CLEAR'
const FINISH = 'register/FINISH'

// ------------------------------------
// Actions
// ------------------------------------
export const updateNewUser = createAction(UPDATE_NEW_USER)
export const loading = createAction(LOADING)
export const clear = createAction(CLEAR)
export const finish = createAction(FINISH)

export const submit = () => {
  return (dispatch, getState) => {
    const body = getState().get('register').get('newUser').toJS()

    dispatch(loading())
    return request.put('/register')
      .send(body)
      .end((error, res) => {
        if (error) {
          console.log(error)
        }
        dispatch(finish())
        dispatch(updateCurrentUser(res.body))
        dispatch(NavigationActions.navigate({ routeName: 'AuthScreen' }))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_NEW_USER]: (state, { payload }) => {
    return state.update('newUser', newUser => newUser.merge(fromJS(payload)))
  },
  [CLEAR]: (state, { payload }) => {
    return initialState
  },
  [LOADING]: (state, { payload }) => {
    return state.set('loading', true)
  },
  [FINISH]: (state, { payload }) => {
    return state.set('loading', false)
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
