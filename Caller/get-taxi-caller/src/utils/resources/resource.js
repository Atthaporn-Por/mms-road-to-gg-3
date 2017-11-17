import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import { merge } from 'lodash'

import { setFlashMessage } from 'store/interface'
import { denormalize } from 'store/entities'

import request from '../request'
import constants from './constants'

export default (schema) => {
  const collection = schema.key

  const CONSTANTS = constants(schema)

  const actions = {
    requestResource: createAction(CONSTANTS.REQUEST_RESOURCE),
    updateResource:  createAction(CONSTANTS.UPDATE_RESOURCE),
    setError:        createAction(CONSTANTS.SET_ERROR)
  }

  const thunkActions = {
    getResource: (id, options = {}) => {
      return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
          dispatch(actions.requestResource(id))

          const locale = options.locale || getState().get('i18n').get('locale')
          const accessToken = getState().get('authentication').get('accessToken')

          request.get(`/admin/${collection}/${id}`)
          .locale(locale)
          .accessToken(accessToken)
          .normalize(schema, dispatch)
          .then(normalizedResource => {
            dispatch(actions.updateResource(normalizedResource.result))
            resolve(normalizedResource.result)
          })
          .catch(error => {
            dispatch(actions.setError(error.response.body.message))
            reject(error)
          })
        })
      }
    },

    destroyResource: (id, options = {}) => {
      return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
          dispatch(actions.requestResource())

          const locale = options.locale || getState().get('i18n').get('locale')
          const accessToken = getState().get('authentication').get('accessToken')

          request.delete(`/admin/${collection}/${id}`)
          .locale(locale)
          .accessToken(accessToken)
          .normalize(schema, dispatch)
          .then(normalizedResource => {
            dispatch(actions.updateResource(normalizedResource.result))
            dispatch(push(`/${collection}`))
            dispatch(setFlashMessage('success', 'Deleted Successful.'))
            resolve(normalizedResource.result)
          })
          .catch(error => {
            dispatch(setFlashMessage('error', error.response.body.message))
            dispatch(actions.setError(error.response.body.message))
            reject(error)
          })
        })
      }
    },

    prepareResource: (id, callback, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.requestPrepareResource())

        const locale = options.locale || getState().get('i18n').get('locale')
        const accessToken = getState().get('authentication').get('accessToken')

        request.get(`/admin/${collection}/${id}`)
        .locale(locale)
        .accessToken(accessToken)
        .normalize(schema, dispatch)
        .then(normalizedResource => {
          dispatch(actions.updateResource(normalizedResource.result))

          const resource = denormalize(
            getState().get(collection).get('resource'),
            schema,
            getState().get('entities')
          )

          if (resource) {
            callback(resource)
          }
          else {
            dispatch(actions.setError('Could not denormalize resource'))
          }
        })
        .catch(error => {
          dispatch(actions.setError(error.message))
        })
      }
    }
  }

  return merge(actions, thunkActions)
}
