import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import { merge } from 'lodash'

import { setFlashMessage } from 'store/interface'

import request from '../request'

import constants from './constants'

export default (schema) => {
  const collection = schema.key

  const CONSTANTS = constants(schema)

  const actions = {
    updateDuplicateResource: createAction(CONSTANTS.UPDATE_EDIT_RESOURCE),
    resetDuplicateResource:  createAction(CONSTANTS.RESET_EDIT_RESOURCE),
    setError:                createAction(CONSTANTS.SET_ERROR)
  }

  return merge(actions)
}
