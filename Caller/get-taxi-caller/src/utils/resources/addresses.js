import { createAction } from 'redux-actions'
import { merge } from 'lodash'

import request from '../request'

import constants from './constants'

import { provinceSchema, districtSchema, addressSchema } from 'store/entities'

export default (schema) => {
  const CONSTANTS = constants(schema)

  const actions = {
    requestAddresses: createAction(CONSTANTS.REQUEST_ADDRESSES),
    updateAddresses:  createAction(CONSTANTS.UPDATE_ADDRESSES),
    setError:         createAction(CONSTANTS.SET_ERROR)
  }

  const thunkActions = {
    getAddresses: (id, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.requestAddresses())

        const locale = options.locale || getState().get('i18n').get('locale')
        const accessToken = getState().get('authentication').get('accessToken')

        request.get(`/admin/users/${id}/addresses`)
        .locale(locale)
        .accessToken(accessToken)
        .normalize([addressSchema], dispatch)
        .then(normalizedCollection => {
          dispatch(actions.updateAddresses({ type: 'userAddresses', data: normalizedCollection.result }))
        })
        .catch(error => {
          dispatch(actions.setError(error.response.body.message))
        })
      }
    },

    getProvinces: (query, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.requestAddresses())

        const locale = options.locale || getState().get('i18n').get('locale')
        const accessToken = getState().get('authentication').get('accessToken')

        request.get(`/admin/provinces`)
        .locale(locale)
        .query({ query })
        .accessToken(accessToken)
        .normalize([provinceSchema], dispatch)
        .then(normalizedCollection => {
          dispatch(actions.updateAddresses({ type: 'provinces', data: normalizedCollection.result }))
        })
        .catch(error => {
          dispatch(actions.setError(error.response.body.message))
        })
      }
    },

    getDistricts: (id, query, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.requestAddresses())

        const locale = options.locale || getState().get('i18n').get('locale')
        const accessToken = getState().get('authentication').get('accessToken')

        request.get(`/admin/provinces/${id}`)
        .locale(locale)
        .query({ query })
        .accessToken(accessToken)
        .normalize(provinceSchema, dispatch)
        .then(normalizedCollection => {
          // dispatch(actions.updateAddresses({ type: 'districs', data: normalizedCollection.result }))
        })
        .catch(error => {
          dispatch(actions.setError(error.response.body.message))
        })
      }
    },

    getSubDistricts: (districtId, query, options = {}) => {
      return (dispatch, getState) => {
        dispatch(actions.requestAddresses())

        const locale = options.locale || getState().get('i18n').get('locale')
        const accessToken = getState().get('authentication').get('accessToken')

        request.get(`/admin/districts/${districtId}`)
        .locale(locale)
        .query({ query })
        .accessToken(accessToken)
        .normalize(districtSchema, dispatch)
        .then(normalizedCollection => {
          // dispatch(actions.updateAddresses({ type: 'subDistrict', data: normalizedCollection.result }))
        })
        .catch(error => {
          dispatch(actions.setError(error.response.body.message))
        })
      }
    }
  }

  return merge(actions, thunkActions)
}
