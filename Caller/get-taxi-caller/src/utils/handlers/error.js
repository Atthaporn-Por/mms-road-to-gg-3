import constants from '../constants'
import { Map } from 'immutable'

export default (schema) => {
  const CONSTANTS = constants(schema)

  return {
    [CONSTANTS.SET_ERROR]: (state, { payload }) => {
      return state.set('error', payload)
                  .set('collectionLoading', false)
                  .set('searchLoading', false)
                  .set('resourceLoading', false)
                  .set('addressesLoading', false)
                  .set('loading', Map())
    }
  }
}
