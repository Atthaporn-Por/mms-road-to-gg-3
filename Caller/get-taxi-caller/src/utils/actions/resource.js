import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import { merge } from 'lodash'

import { setFlashMessage } from 'store/interface'
import { denormalize } from 'store/entities'

import request from '../request'
import constants from '../constants'

import error from './error'

export default (schema) => {
  const collection = schema.key

  const CONSTANTS = constants(schema)

  const errorActions = error(schema)

  const actions = {
    preparingResource: createAction(CONSTANTS.PREPARING_RESOURCE),
    requestResource: createAction(CONSTANTS.REQUEST_RESOURCE),
    updateResource: createAction(CONSTANTS.UPDATE_RESOURCE),
    deleteResource: createAction(CONSTANTS.DELETE_RESOURCE)
  }

  const thunkActions = {
    getResource: (id, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.requestResource(id))

        const locale = options.locale || getState().get('i18n').get('locale')
        const accessToken = getState().get('authentication').get('accessToken')
        const callback = options.callback

        return request.get(`/admin/${collection}/${id}`)
        .locale(locale)
        .accessToken(accessToken)
        .normalize(schema, dispatch)
        .then(normalizedResource => {
          dispatch(actions.updateResource(normalizedResource.result))

          const resource = denormalize(
            normalizedResource.result,
            schema,
            getState().get('entities')
          )

          if (callback) {
            callback({ dispatch, getState, resource })
          }

          return { dispatch, getState, resource }
        })
        .catch(error => {
          dispatch(errorActions.setError(error.message))
        })
      }
    },

    destroyResource: (id, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.requestResource())
        dispatch(actions.deleteResource())

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
        })
        .catch(error => {
          dispatch(setFlashMessage('error', error.message))
          dispatch(errorActions.setError(error.message))
        })
      }
    }
  }

  return merge(actions, thunkActions)
}
