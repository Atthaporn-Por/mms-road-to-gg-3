import { fromJS } from 'immutable'

import constants from '../constants'

export default (schema) => {
  const CONSTANTS = constants(schema)

  return {
    [CONSTANTS.REQUEST_COLLECTION]: (state, { payload }) => {
      return state.set('loadingCollection', true)
    },

    [CONSTANTS.UPDATE_COLLECTION]: (state, { payload }) => {
      return state.setIn(['collection', payload.page], fromJS(payload.data))
                  .set('loadingCollection', false)
                  .set('loadingSearch', false)
    },

    [CONSTANTS.UPDATE_PAGE]: (state, { payload }) => {
      return state.set('page', payload)
    },

    [CONSTANTS.REQUEST_SEARCH]: (state, { payload }) => {
      return state.set('loadingSearch', true)
    },

    [CONSTANTS.UPDATE_SEARCH_DATA]: (state, { payload }) => {
      return state.setIn(['search', payload.page], fromJS(payload.data))
                  .set('loadingSearch', false)
    },

    [CONSTANTS.UPDATE_SEARCH]: (state, { payload }) => {
      return state.update('search', resource => payload(resource))
    },

    [CONSTANTS.UPDATE_FILTERS]: (state, { payload }) => {
      return state.update('filters', resource => payload(resource))
    },

    [CONSTANTS.UPDATE_FILTER_FIELDS]: (state, { payload }) => {
      return state.updateIn(['filters', 'fields'], resource => payload(resource))
    },

    [CONSTANTS.UPDATE_FILTER_FUNCTIONS]: (state, { payload }) => {
      return state.updateIn(['filters', 'functions'], resource => payload(resource))
    }
  }
}
