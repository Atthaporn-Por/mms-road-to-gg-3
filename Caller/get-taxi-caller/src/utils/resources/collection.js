import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import qs from 'qs'
import { merge } from 'lodash'

import request from '../request'

import constants from './constants'

export default (schema) => {
  const collection = schema.key

  const CONSTANTS = constants(schema)

  const actions = {
    requestCollection: createAction(CONSTANTS.REQUEST_COLLECTION),
    updateCollection:  createAction(CONSTANTS.UPDATE_COLLECTION),
    requestSearch:     createAction(CONSTANTS.REQUEST_SEARCH),
    updateSearch:      createAction(CONSTANTS.UPDATE_SEARCH),
    updatePage:        createAction(CONSTANTS.UPDATE_PAGE),
    setError:          createAction(CONSTANTS.SET_ERROR)
  }

  const thunkActions = {
    getCollection: (page = 0, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.requestCollection())

        const locale = options.locale || getState().get('i18n').get('locale')
        const accessToken = getState().get('authentication').get('accessToken')
        const query = options.query || ''

        request.get(`/admin/${collection}`)
        .query({ page: page + 1, query })
        .locale(locale)
        .accessToken(accessToken)
        .normalize([schema], dispatch)
        .then(normalizedCollection => {
          dispatch(actions.updateCollection({ page, data: normalizedCollection.result }))
        })
        .catch(error => {
          dispatch(actions.setError(error.response.body.message))
        })
      }
    },

    pushQuery: (query, options = {}) => {
      return (dispatch, getState) => {
        dispatch(push({
          pathname: getState().get('routing').get('locationBeforeTransitions').pathname,
          query: query
        }))
      }
    },

    search: (query, options = {}) => {
      return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
          dispatch(actions.requestSearch())

          const locale = options.locale || getState().get('i18n').get('locale')
          const accessToken = getState().get('authentication').get('accessToken')
          const page = options.page || 0

          request.get(`/admin/${collection}`)
          .query(qs.stringify({ query, page }, { arrayFormat: 'brackets' }))
          .locale(locale)
          .accessToken(accessToken)
          .normalize([schema], dispatch)
          .then(normalizedCollection => {
            dispatch(actions.updateSearch({ page, data: normalizedCollection.result }))
            resolve(normalizedCollection.result)
          })
          .catch(error => {
            dispatch(actions.setError(error.response.body.message))
            reject(error)
          })
        })
      }
    }
  }

  return merge(actions, thunkActions)
}
