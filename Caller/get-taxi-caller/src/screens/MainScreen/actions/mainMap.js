import { createAction } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'
import superagent from 'superagent'

import Polyline from '@mapbox/polyline'

import request from 'utils/request'

import { GOOGLE_MAP_API_KEY } from 'react-native-dotenv'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_MAIN_MAP = 'mainMap/UPDATE_MAIN_MAP'
export const CLEAR = 'mainMap/CLEAR'
export const UPDATE_MAP_ROUTE = 'mainMap/UPDATE_MAP_ROUTE'

// ------------------------------------
// Actions
// ------------------------------------

export const updateMainMap = createAction(UPDATE_MAIN_MAP)
export const clearMainMap = createAction(CLEAR)
export const updateMapRoute = createAction(UPDATE_MAP_ROUTE)

export const getNearbyTaxi = ({ latitude, longitude } = {}) => {
  return (dispatch, getState) => {
    const allPosibleLocation = [
      () => ({ latitude, longitude }),
      () => (getState().get('newTransaction').get('pick_up', Map()).get('geometry', Map()).get('location', Map()).toJS()),
      () => (getState().get('mainMap').get('mapRegion', Map()).toJS())
    ]

    const location = _.find(allPosibleLocation, item => {
      return _.size(_.omitBy(item(), _.isNil))
    })

    console.log(location())

    if (_.isNil(location)) {
      return
    }

    // return superagent.get('localhost:5000/searchtaxi')
    return request.get('/searchtaxi')
      .query(location())
      .end(res => {
        console.log(res)
      })
  }
}

export const getDirections = ({ pickUpLocation, dropOffLocation } = {}) => {
  return (dispatch, getState) => {
    const newTransaction = getState().get('newTransaction', Map())

    pickUpLocation = pickUpLocation || newTransaction.get('pick_up', Map()).get('geometry', Map()).get('location', Map())
    dropOffLocation = dropOffLocation || newTransaction.get('drop_off', Map()).get('geometry', Map()).get('location', Map())

    if (pickUpLocation.size && dropOffLocation.size) {
      dispatch(getDirectionsApi({
        pickUpLocation: `${pickUpLocation.get('latitude')},${pickUpLocation.get('longitude')}`,
        dropOffLocation: `${dropOffLocation.get('latitude')},${dropOffLocation.get('longitude')}`
      }))
    }
  }
}

export const getDirectionsApi = ({ pickUpLocation, dropOffLocation } = {}) => {
  return (dispatch, getState) => {
    return superagent.get('https://maps.googleapis.com/maps/api/directions/json')
      .query({
        origin: pickUpLocation,
        destination: dropOffLocation,
        key: GOOGLE_MAP_API_KEY
      })
      .on('error', error => console.warn(error))
      .then(res => {
        console.log('res: ', res)
        return res.body
      })
      .then(res => {
        let points = Polyline.decode(res.routes[0].overview_polyline.points)
        let coords = points.map((point, index) => {
          return {
            latitude : point[0],
            longitude : point[1]
          }
        })

        dispatch(updateMapRoute(coords))
        console.log(coords)
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [UPDATE_MAIN_MAP]: (state, { payload }) => {
    return state.mergeDeep({
      payload
    })
  },
  [UPDATE_MAP_ROUTE]: (state, { payload }) => {
    return state.set('map_route', fromJS(payload))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  mapRegion: { latitude: 13.7563, longitude: 100.5018, latitudeDelta: 0.1, longitudeDelta: 0.05 },
  map_route: { }
})

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
