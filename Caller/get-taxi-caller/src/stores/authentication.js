import { AsyncStorage } from 'react-native'
import Immutable from 'immutable'
import request from 'utils/request'
// import I18n from 'utils/i18n'

// import { push } from 'react-router-redux'

// import { normalize } from 'stores/entities'
import { setFlashMessage } from './interface'

// const boilerplate = require('stores/resources').default('authentication', null)

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN'
export const UPDATE_USER_LOGIN = 'UPDATE_USER_LOGIN'

export const SIGN_IN_LOADING = 'SIGN_IN_LOADING'

// ------------------------------------
// Actions
// ------------------------------------
function updateCurrentUser (user) {
  return {
    type    : UPDATE_CURRENT_USER,
    payload : user
  }
}

function updateAccessToken (accessToken) {
  return {
    type    : UPDATE_ACCESS_TOKEN,
    payload : accessToken
  }
}

export function updateUserLogin (userLogin) {
  return {
    type    : UPDATE_USER_LOGIN,
    payload : userLogin
  }
}

export function signInLoading (value) {
  return {
    type    : SIGN_IN_LOADING,
    payload : value
  }
}

// const { draftRequestThunkAction } = boilerplate

export const login = (redirect = true) => {
  return (dispatch, getState) => {
    dispatch(signInLoading(true))

    request.post('/authentication/session')
      .send(getState().get('authentication').get('updateUserLogin').get('emailLogin'))
      .then(response => {
        dispatch(updateCurrentUser(response.body.admin_user))
        dispatch(updateAccessToken(response.body.access_token))

        if (redirect) {
          // dispatch(push(getState().get('routing').get('redirectURL', '/')))
        }
      })
      .catch(error => {
        dispatch(setFlashMessage('signInError', error.response.body.message))
        console.warn(error.response.body.message)
      })
      .then(() => {
        dispatch(signInLoading(false))
      })
  }
}

export const oauthLogin = (redirect = true) => {
  return (dispatch, getState) => {
    dispatch(signInLoading(true))

    request.post('/authentication/session/oauth')
      .send(getState().get('authentication').get('updateUserLogin').get('oauthLogin'))
      .then(response => {
        dispatch(updateCurrentUser(response.body.admin_user))
        dispatch(updateAccessToken(response.body.access_token))

        if (redirect) {
          // dispatch(push(getState().get('routing').get('redirectURL', '/')))
        }
      })
      .catch(error => {
        dispatch(setFlashMessage('signInError', error.response.body.message))
        console.warn(error.response.body.message)
      })
      .then(() => {
        dispatch(signInLoading(false))
      })
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    request.del('/authentication/session')
      .accessToken(getState().get('authentication').get('accessToken'))
      .catch(error => {
        console.warn(error.message)
      })
      .then(() => {
        dispatch(updateAccessToken(undefined))
        dispatch(updateCurrentUser(undefined))
        AsyncStorage.clear()

        // dispatch(push('/sign_in'))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_CURRENT_USER]: (state, { payload }) => {
    return state.merge({
      currentUser: payload
    })
  },
  [UPDATE_ACCESS_TOKEN]: (state, { payload }) => {
    return state.merge({
      accessToken: payload
    })
  },
  [UPDATE_USER_LOGIN]: (state, { payload }) => {
    return state.mergeDeep({
      updateUserLogin: payload
    })
  },
  [SIGN_IN_LOADING]: (state, { payload }) => {
    return state.merge({
      signInLoading: payload
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  signInLoading: false,
  currentUser: {
    favorite_places: [{
      description: 'Work',
      name: 'Work',
      geometry: { location: { lat: 13.7563, lng: 100.5018 } }
    }, {
      description: 'Home',
      name: 'Home',
      geometry: { location: { lat: 13.8563, lng: 100.6018 } }
    }]
  }
})

export default function authenticationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
