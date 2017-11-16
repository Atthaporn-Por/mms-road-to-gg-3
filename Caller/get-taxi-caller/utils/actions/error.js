import { createAction } from 'redux-actions'

import constants from '../constants'

export default (schema) => {
  const CONSTANTS = constants(schema)

  const actions = {
    setError: createAction(CONSTANTS.SET_ERROR)
  }

  return actions
}
