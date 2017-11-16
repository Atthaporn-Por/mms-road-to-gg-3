import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import { Iterable, Map } from 'immutable'
import qs from 'qs'
import { isFunction, isString, merge } from 'lodash'

import request from '../request'
import constants from '../constants'

import error from './error'

export default (schema) => {
  const collection = schema.key

  const CONSTANTS = constants(schema)
  const errorActions = error(schema)

  const actions = {
    requestCollection: createAction(CONSTANTS.REQUEST_COLLECTION),
    updateCollection:  createAction(CONSTANTS.UPDATE_COLLECTION),
    requestSearch:     createAction(CONSTANTS.REQUEST_SEARCH),
    updateSearchData:  createAction(CONSTANTS.UPDATE_SEARCH_DATA),
    updatePage:        createAction(CONSTANTS.UPDATE_PAGE),
    updateSearch:      createAction(CONSTANTS.UPDATE_SEARCH),
    updateFilters:     createAction(CONSTANTS.UPDATE_FILTERS),
    updateFilterFields: createAction(CONSTANTS.UPDATE_FILTER_FIELDS),
    updateFilterFunctions: createAction(CONSTANTS.UPDATE_FILTER_FUNCTIONS)
  }

  const thunkActions = {
    getCollection: (page = 0, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.requestCollection())

        const locale = options.locale || getState().get('i18n').get('locale')
        const accessToken = getState().get('authentication').get('accessToken')
        const query = options.query && qs.parse(options.query) || options.query

        request.get(`/admin/${collection}`)
        .query(qs.stringify({ query, page: page + 1 }, { arrayFormat: 'brackets' }))
        .locale(locale)
        .accessToken(accessToken)
        .normalize([schema], dispatch)
        .then(normalizedCollection => {
          dispatch(actions.updateCollection({ page, data: normalizedCollection.result }))
        })
        .catch(error => {
          dispatch(errorActions.setError(error.response))
        })
      }
    },

    pushQuery: (query, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.requestSearch())

        dispatch(push({
          pathname: getState().get('routing').get('locationBeforeTransitions').pathname,
          query: query
        }))
      }
    },

    pushQueryStore: (options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.requestSearch())

        const filters = getState().get(collection).get('filters') || Map()
        const filterFields = filters.get('fields') || Map()
        const filterFunctions = filters.get('functions') || Map()
        const search = getState().get(collection).get('search') || Map()
        const key = search.get('key')
        const value = search.get('value')

        let query = {}

        if (isFunction(key)) {
          query = key(value)
        }
        else if (isString(key)) {
          query = { [key]: value }
        }

        filterFields.map((value, key) => {
          if (filterFunctions.has(key)) {
            query = merge(query, filterFunctions.get(key)(key, value))
          }
          else if (Iterable.isIterable(value)) {
            query[key + '_in'] = value.toJS()
          }
          else {
            query[key + '_eq'] = value
          }
        })

        dispatch(push({
          pathname: getState().get('routing').get('locationBeforeTransitions').pathname,
          search: '?' + qs.stringify(query, { encode: false }, { arrayFormat: 'brackets' })
        }))
      }
    },

    search: (query, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.requestSearch())

        const locale = options.locale || getState().get('i18n').get('locale')
        const accessToken = getState().get('authentication').get('accessToken')
        const page = (options.page || 0) + 1

        return request.get(`/admin/${collection}`)
        .query(qs.stringify({ query, page }, { arrayFormat: 'brackets' }, { encode: false }))
        .locale(locale)
        .accessToken(accessToken)
        .normalize([schema], dispatch)
        .then(normalizedCollection => {
          dispatch(actions.updateSearchData({ page, data: normalizedCollection.result }))
        })
        .catch(error => {
          dispatch(errorActions.setError(error.response.body.message))
        })
      }
    }
  }

  return merge(actions, thunkActions)
}
