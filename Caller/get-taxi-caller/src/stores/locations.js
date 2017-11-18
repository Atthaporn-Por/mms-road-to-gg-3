import { createAction } from 'redux-actions'
import { List, fromJS } from 'immutable'

import request from 'utils/request'
import { updateEntity, provinceSchema, districtSchema, subDistrictSchema } from 'stores/entities'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_PROVINCES = 'locations/UPDATE_PROVINCES'
export const UPDATE_DISTRICTS = 'locations/UPDATE_DISTRICTS'
export const UPDATE_SUB_DISTRICTS = 'locations/UPDATE_SUB_DISTRICTS'
// ------------------------------------
// Actions
// ------------------------------------

export const updateProvinces = createAction(UPDATE_PROVINCES)
export const updateDistricts = createAction(UPDATE_DISTRICTS)
export const updateSubDistricts = createAction(UPDATE_SUB_DISTRICTS)

// ------------------------------------
// Thunk Actions
// ------------------------------------

export function getProvinces (query, options = {}) {
  return (dispatch, getState) => {
    // dispatch(actions.requestAddresses())

    const locale = options.locale || getState().get('i18n').get('locale')
    const accessToken = getState().get('authentication').get('accessToken')

    request.get('/admin/provinces')
    .locale(locale)
    .query({ query })
    .accessToken(accessToken)
    .normalize([provinceSchema], dispatch)
    .then(normalizedCollection => {
      dispatch(updateProvinces(normalizedCollection.result))
    })
    .catch(error => {
      console.error(error)
    })
  }
}

export function getProvince (id, options = {}) {
  return (dispatch, getState) => {
    // dispatch(actions.requestAddresses())

    const locale = options.locale || getState().get('i18n').get('locale')
    const accessToken = getState().get('authentication').get('accessToken')

    request.get(`/admin/provinces/${id}`)
    .locale(locale)
    .accessToken(accessToken)
    .normalize(provinceSchema, dispatch)
    .then(normalizedCollection => {

    })
    .catch(error => {
      console.error(error)
    })
  }
}

export function getDistricts (id, query, options = {}) {
  return (dispatch, getState) => {
    // dispatch(actions.requestAddresses())

    const locale = options.locale || getState().get('i18n').get('locale')
    const accessToken = getState().get('authentication').get('accessToken')

    request.get(`/admin/provinces/${id}/districts`)
    .locale(locale)
    .query({ query })
    .accessToken(accessToken)
    .normalize([districtSchema], dispatch)
    .then(normalizedCollection => {
      dispatch(updateDistricts(normalizedCollection.result))
      dispatch(updateEntity(provinceSchema, id,
        (resource) => resource.set('districts', List(normalizedCollection.result))
      ))
    })
    .catch(error => {
      console.error(error)
    })
  }
}

export function getDistrict (id, options = {}) {
  return (dispatch, getState) => {
    // dispatch(actions.requestAddresses())

    const locale = options.locale || getState().get('i18n').get('locale')
    const accessToken = getState().get('authentication').get('accessToken')

    request.get(`/admin/districts/${id}`)
    .locale(locale)
    .accessToken(accessToken)
    .normalize(districtSchema, dispatch)
    .then(normalizedCollection => {

    })
    .catch(error => {
      console.error(error)
    })
  }
}

export function getSubDistricts (id, query, options = {}) {
  return (dispatch, getState) => {
    // dispatch(actions.requestAddresses())

    const locale = options.locale || getState().get('i18n').get('locale')
    const accessToken = getState().get('authentication').get('accessToken')

    request.get(`/admin/districts/${id}/sub_districts`)
    .locale(locale)
    .query({ query })
    .accessToken(accessToken)
    .normalize([subDistrictSchema], dispatch)
    .then(normalizedCollection => {
      dispatch(updateSubDistricts(normalizedCollection.result))
      dispatch(updateEntity(districtSchema, id,
        (resource) => resource.set('sub_districts', List(normalizedCollection.result))
      ))
    })
    .catch(error => {
      console.error(error)
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_PROVINCES]: (state, { payload }) => {
    return state.set('provinces', List(payload))
  },
  [UPDATE_DISTRICTS]: (state, { payload }) => {
    return state.set('districts', List(payload))
  },
  [UPDATE_SUB_DISTRICTS]: (state, { payload }) => {
    return state.set('subDistricts', List(payload))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  provinces: [],
  districts: [],
  subDistricts: []
})

export default function locationsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
