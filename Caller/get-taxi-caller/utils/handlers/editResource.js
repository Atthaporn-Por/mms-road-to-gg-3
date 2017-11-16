import constants from '../constants'

export default (schema) => {
  const CONSTANTS = constants(schema)

  return {
    [CONSTANTS.PATCHING_RESOURCE]: (state, { payload }) => {
      return state.set('patchingResource', true)
    },

    [CONSTANTS.UPDATE_EDIT_RESOURCE]: (state, { payload }) => {
      return state.update('editResource', resource => payload(resource))
                  .set('patchingResource', false)
    },

    [CONSTANTS.RESET_EDIT_RESOURCE]: (state) => {
      return state.set('editResource', Map())
    }
  }
}
