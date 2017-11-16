import { createAction } from 'redux-actions'
import { merge } from 'lodash'

import constants from './constants'

export default (schema) => {
  const CONSTANTS = constants(schema)

  const actions = {
    updateAllFieldsList:   createAction(CONSTANTS.UPDATE_ALL_FIELDS_LIST),
    updateField:           createAction(CONSTANTS.UPDATE_FIELD),
    updateFields:          createAction(CONSTANTS.UPDATE_FIELDS),
    toggleAdvSearch:       createAction(CONSTANTS.TOGGLE_ADV_SEARCH),
    addAdvSearchOption:    createAction(CONSTANTS.ADD_ADV_SEARCH_OPTION),
    removeAdvSearchOption: createAction(CONSTANTS.REMOVE_ADV_SEARCH_OPTION),
    updateAdvSearchOption: createAction(CONSTANTS.UPDATE_ADV_SEARCH_OPTION),
    clearAdvSearchOption:  createAction(CONSTANTS.CLEAR_ADV_SEARCH_OPTION),
    setError: createAction(CONSTANTS.SET_ERROR)
  }

  const thunkActions = {

  }

  return merge(actions, thunkActions)
}
