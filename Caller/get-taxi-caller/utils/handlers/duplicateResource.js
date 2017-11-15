import constants from '../constants'

export default (schema) => {
  const CONSTANTS = constants(schema)

  return {
    [CONSTANTS.DUPLICATING_RESOURCE]: (state, { payload }) => {
      return state.set('duplicatingResource', true)
    },

    [CONSTANTS.UPDATE_DUPLICATE_RESOURCE]: (state, { payload }) => {
      return state.update('duplicateResource', resource => payload(resource))
                  .set('duplicatingResource', false)
    },

    [CONSTANTS.RESET_DUPLICATE_RESOURCE]: (state) => {
      return state.set('duplicateResource', Map())
    }
  }
}
