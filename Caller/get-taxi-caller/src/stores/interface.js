import { Map, List, fromJS } from 'immutable'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_DEVICE_WIDTH = 'UPDATE_DEVICE_WIDTH'
export const UPDATE_ADMIN_NAME_WIDTH = 'UPDATE_ADMIN_NAME_WIDTH'
export const SET_FLASH_MESSAGE = 'SET_FLASH_MESSAGE'
export const CLEAR_FLASH_MESSAGE = 'CLEAR_FLASH_MESSAGE'

// ------------------------------------
// Actions
// ------------------------------------
export function updateDeviceWidth (deviceWidth) {
  return {
    type    : UPDATE_DEVICE_WIDTH,
    payload : deviceWidth
  }
}

export function updateAdminNameWidth (adminNameWidth) {
  return {
    type: UPDATE_ADMIN_NAME_WIDTH,
    payload: adminNameWidth
  }
}

export function setFlashMessage (level, message) {
  return {
    type    : SET_FLASH_MESSAGE,
    payload : { level, message }
  }
}

export function clearFlashMessage () {
  return {
    type    : CLEAR_FLASH_MESSAGE
  }
}

export const actions = {
  updateAdminNameWidth,
  updateDeviceWidth,
  setFlashMessage,
  clearFlashMessage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_DEVICE_WIDTH]: (state, { payload }) => {
    return state.merge({
      deviceWidth: payload,
      isMobile: payload < 768
    })
  },
  [UPDATE_ADMIN_NAME_WIDTH]: (state, { payload }) => {
    return state.merge({
      adminNameWidth: payload
    })
  },
  [SET_FLASH_MESSAGE]: (state, { payload }) => {
    return state.set('flashMessage', Map(payload))
  },
  [CLEAR_FLASH_MESSAGE]: (state) => {
    return state.set('flashMessage', undefined)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  adminNameWidth: 0
})

export default function interfaceReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
