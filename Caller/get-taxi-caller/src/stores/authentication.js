import { AsyncStorage } from 'react-native'
import { fromJS } from 'immutable'
import { createAction } from 'redux-actions'
import { NavigationActions } from 'react-navigation'
// import I18n from 'utils/i18n'
import request from 'utils/request'

// import { normalize } from 'stores/entities'
import { setFlashMessage } from './interface'

// const boilerplate = require('stores/resources').default('authentication', null)

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_CURRENT_USER = 'authentication/UPDATE_CURRENT_USER'
export const UPDATE_ACCESS_TOKEN = 'authentication/UPDATE_ACCESS_TOKEN'
export const UPDATE_USER_LOGIN = 'authentication/UPDATE_USER_LOGIN'
export const UPDATE_USER_O_AUTH = 'authentication/UPDATE_USER_O_AUTH'
export const CLEAR = 'authentication/CLEAR'

export const SIGN_IN_LOADING = 'authentication/SIGN_IN_LOADING'

// ------------------------------------
// Actions
// ------------------------------------
export const clear = createAction(CLEAR)

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

export function updateUserLogingin (userLogin) {
  return {
    type    : UPDATE_USER_LOGIN,
    payload : userLogin
  }
}

export function updateUserOAuth (payload) {
  return {
    type    : UPDATE_USER_O_AUTH,
    payload : payload
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
      .send(getState().get('authentication').get('userLogingin').get('emailLogin'))
      .then((error, response) => {
        dispatch(updateCurrentUser(response.body.user))
        dispatch(updateAccessToken(response.body.access_token))

        if (error) {
          throw new Error(error)
        }

        if (redirect) {
          dispatch(NavigationActions.navigate({ routeName: 'AuthScreen' }))
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
      .send(getState().get('authentication').get('userLogingin').get('oauthLogin'))
      .then((error, response) => {
        dispatch(updateCurrentUser(response.body.user))
        dispatch(updateAccessToken(response.body.access_token))

        if (error) {
          throw new Error(error)
        }

        return { success: true }
      })
      .catch(error => {
        dispatch(setFlashMessage('signInError', error.response.body.message))
        console.warn(error.response.body.message)
        return { success: false }
      })
      .then((res) => {
        dispatch(signInLoading(false))
        return res
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

        dispatch(NavigationActions.navigate({ routeName: 'UnAuthScreen' }))
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
    return state.mergeIn(['userLogingin', 'emailLogin'], fromJS(payload))
  },
  [UPDATE_USER_O_AUTH]: (state, { payload }) => {
    return state.mergeIn(['userLogingin', 'oauthLogin'], fromJS(payload))
  },
  [CLEAR]: (state, { payload }) => {
    return initialState
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
const initialState = fromJS({
  signInLoading: false,
  userLogingin: {
    emailLogin: {
      user: null,
      Password: null
    },
    oauthLogin: {
      token: null,
      type: null
    }
  },
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
