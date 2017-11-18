import { fromJS } from 'immutable'
import { merge } from 'lodash'

import {
  collection, filter, resource, newResource, editResource, duplicateResource, error
} from './handlers'

export default (schema) => {
  const initialState = fromJS({
    collection:          {},
    page:                0,

    search:              {},
    searchPage:          0,

    filters:             { functions: {}, fields: {} },

    resource:            undefined, // Should be a numeric ID

    newResource:         {},
    editResource:        {},
    duplicateResource:   {},

    fields:              [],

    loading:             {},

    loadingCollection:   false,
    loadingResource:     false,
    loadingSearch:       false,

    creatingResource:    false,
    patchingResource:    false,
    duplicatingResource: false,
    deletingResource:    false,

    error:               undefined
  })

  const handler = merge(
    collection(schema),
    filter(schema),
    resource(schema),
    newResource(schema),
    editResource(schema),
    duplicateResource(schema),
    error(schema)
  )

  return { handler, initialState }
}
