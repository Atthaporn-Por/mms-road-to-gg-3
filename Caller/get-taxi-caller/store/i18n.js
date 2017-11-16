import Immutable from 'immutable'
import { post } from 'utils/request'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_LOCALE = 'UPDATE_LOCALE'

// ------------------------------------
// Actions
// ------------------------------------
export function updateLocale (locale) {
  return {
    type    : UPDATE_LOCALE,
    payload : locale
  }
}

export const actions = {
  updateLocale
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_LOCALE]: (state, { payload }) => {
    return state.merge({
      locale: payload
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  locale: 'en'
})

export default function i18nReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
