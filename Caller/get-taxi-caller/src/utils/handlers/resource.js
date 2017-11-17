import constants from '../constants'

export default (schema) => {
  const CONSTANTS = constants(schema)

  return {
    [CONSTANTS.REQUEST_RESOURCE]: (state, { payload }) => {
      return state.set('resource', payload)
                  .set('loadingResource', true)
    },

    [CONSTANTS.DELETE_RESOURCE]: (state, { payload }) => {
      return state.set('resource', payload)
                  .set('deletingResource', true)
    },

    [CONSTANTS.UPDATE_RESOURCE]: (state, { payload }) => {
      return state.set('resource', payload)
                  .set('loadingResource', false)
                  .set('patchingResource', false)
                  .set('creatingResource', false)
                  .set('deletingResource', false)
    }
  }
}
