import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import { merge } from 'lodash'
import pluralize from 'pluralize'

import { setFlashMessage } from 'stores/interface'

import request from '../request'
import constants from '../constants'

import error from './error'
import resource from './resource'

export default (schema) => {
  const collection = schema.key
  const resourceName = pluralize(collection, 1)

  const CONSTANTS = constants(schema)

  const errorActions = error(schema)
  const resourceActions = resource(schema)

  const actions = {
    duplicatingResource: createAction(CONSTANTS.DUPLICATING_RESOURCE),
    updateResource: createAction(CONSTANTS.UPDATE_DUPLICATE_RESOURCE),
    resetResource: createAction(CONSTANTS.RESET_DUPLICATE_RESOURCE)
  }

  const thunkActions = {
    createResource: (id, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.duplicatingResource())

        const locale = options.locale || getState().get('i18n').get('locale')
        const accessToken = getState().get('authentication').get('accessToken')
        const body = options.body || getState().get(collection).get('duplicateResource')

        return request.post(`/admin/${collection}`)
        .locale(locale)
        .accessToken(accessToken)
        .send(body)
        .normalize(schema, dispatch)
        .then(normalizedResource => {
          dispatch(resourceActions.updateResource(normalizedResource.result))
          dispatch(push(`/${collection}/${normalizedResource.result}`))
          dispatch(actions.resetResource())
          dispatch(setFlashMessage('success', `Successfully duplicated ${resourceName}.`))

          return normalizedResource.result
        })
        .then(id => {
          if (options.attachments) {
            dispatch(thunkActions.sendAttachments(id, options.attachments))
          }
        })
        .catch(error => {
          dispatch(setFlashMessage('error', error.response.body.message))
          dispatch(errorActions.setError(error.response.body.message))
        })
      }
    },

    sendAttachments: (id, attachments, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.duplicatingResource())

        const locale = options.locale || getState().get('i18n').get('locale')
        const accessToken = getState().get('authentication').get('accessToken')

        const _req = request.put(`/admin/${collection}/${id}`)
                    .locale(locale)
                    .accessToken(accessToken)

        attachments.map((file, key) => {
          _req.attach(key, file)
        })

        _req.normalize(schema, dispatch)
        .then(normalizedResource => {
          dispatch(resourceActions.updateResource(normalizedResource.result))
        })
        .catch(error => {
          dispatch(errorActions.setError(error.response.body.message))
        })
      }
    }
  }

  return merge(actions, thunkActions)
}
