import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import { merge } from 'lodash'
import pluralize from 'pluralize'

import { setFlashMessage } from 'stores/interface'

import request from '../request'

import constants from '../constants'

import resource from './resource'
import error from './error'

export default (schema) => {
  const collection = schema.key
  const resourceName = pluralize(collection, 1)

  const CONSTANTS = constants(schema)

  const resourceActions = resource(schema)
  const errorActions = error(schema)

  const actions = {
    patchingResource: createAction(CONSTANTS.PATCHING_RESOURCE),
    updateResource: createAction(CONSTANTS.UPDATE_EDIT_RESOURCE),
    resetResource: createAction(CONSTANTS.RESET_EDIT_RESOURCE)
  }

  const thunkActions = {
    patchResource: (id, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.patchingResource())

        const locale = options.locale || getState().get('i18n').get('locale')
        const accessToken = getState().get('authentication').get('accessToken')
        const body = options.body || getState().get(collection).get('editResource')
        const attachments = options.attachments

        return request.put(`/admin/${collection}/${id}`)
        .locale(locale)
        .accessToken(accessToken)
        .send(body)
        .normalize(schema, dispatch)
        .then(normalizedResource => {
          dispatch(resourceActions.updateResource(normalizedResource.result))

          if (attachments) {
            const _req = request.put(`/admin/${collection}/${id}`)
                        .locale(locale)
                        .accessToken(accessToken)

            attachments.map((file, key) => {
              _req.attach(key, file)
            })

            return _req.normalize(schema, dispatch)
            .then(normalizedResource => {
              dispatch(resourceActions.updateResource(normalizedResource.result))

              return normalizedResource
            })
            .catch(error => {
              dispatch(errorActions.setError(error.response.body.message))
            })
          }
          else {
            return normalizedResource
          }
        })
        .then(normalizedResource => {
          dispatch(push(`/${collection}/${normalizedResource.result}`))
          dispatch(setFlashMessage('success', `Successfully edited ${resourceName}.`))
        })
        .catch(error => {
          dispatch(setFlashMessage('error', error.response.body.message))
          dispatch(errorActions.setError(error.response.body.message))
        })
      }
    }
  }

  return merge(actions, thunkActions)
}
