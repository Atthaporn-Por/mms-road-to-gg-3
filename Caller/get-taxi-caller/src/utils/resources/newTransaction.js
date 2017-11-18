import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import { merge } from 'lodash'

import { setFlashMessage } from 'stores/interface'

import request from '../request'

import constants from './constants'

export default (schema) => {
  const collection = schema.key

  const CONSTANTS = constants(schema)

  const actions = {
    requestResource:   createAction(CONSTANTS.REQUEST_RESOURCE),
    creatingResource:  createAction(CONSTANTS.CREATING_RESOURCE),
    editingResource:   createAction(CONSTANTS.EDITING_RESOURCE),
    updateResource:    createAction(CONSTANTS.UPDATE_RESOURCE),
    updateNewResource: createAction(CONSTANTS.UPDATE_NEW_RESOURCE),
    resetNewResource:  createAction(CONSTANTS.RESET_NEW_RESOURCE),
    setError:          createAction(CONSTANTS.SET_ERROR)
  }

  const thunkActions = {
    createResource: (id, options = { }) => {
      return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
          dispatch(actions.creatingResource())

          const locale = options.locale || getState().get('i18n').get('locale')
          const accessToken = getState().get('authentication').get('accessToken')
          const body = options.body || getState().get(collection).get('newResource')

          request.post(`/admin/${collection}`)
          .locale(locale)
          .accessToken(accessToken)
          .send(body)
          .normalize(schema, dispatch)
          .then(normalizedResource => {
            dispatch(actions.updateResource(normalizedResource.result))
            dispatch(push(`/${collection}/${normalizedResource.result}`))
            dispatch(actions.resetNewResource())
            dispatch(setFlashMessage('success', 'Created Successful.'))
            return normalizedResource.result
          })
          .then(id => {
            if (options.attachments) {
              dispatch(thunkActions.sendAttachments(id, options.attachments))
            }
          })
          .catch(error => {
            dispatch(setFlashMessage('error', error.response.body.message))
            dispatch(actions.setError(error.response.body.message))
          })
        })
      }
    },

    sendAttachments: (id, attachments, options = {}) => {
      return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
          dispatch(actions.editingResource())

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
            dispatch(actions.updateResource(normalizedResource.result))
          })
          .catch(error => {
            dispatch(setFlashMessage('error', error.message))
            dispatch(actions.setError(error.response.body.message))
          })
        })
      }
    }
  }

  return merge(actions, thunkActions)
}
