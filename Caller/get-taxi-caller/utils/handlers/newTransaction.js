import constants from '../constants'
import { Map } from 'immutable'

export default (schema) => {
  const CONSTANTS = constants(schema)

  return {
    [CONSTANTS.CREATING_RESOURCE]: (state, { payload }) => {
      return state.set('creatingResource', true)
    },

    [CONSTANTS.UPDATE_NEW_RESOURCE]: (state, { payload }) => {
      return state.update('newResource', resource => payload(resource))
                  .set('creatingResource', false)
    },

    [CONSTANTS.RESET_NEW_RESOURCE]: (state) => {
      return state.set('newResource', Map())
    }
  }
}
