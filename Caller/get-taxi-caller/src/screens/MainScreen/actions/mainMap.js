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
export const UPDATE_CURRENT_LOCATION = 'mainMap/UPDATE_CURRENT_LOCATION'
export const UPDATE_CURRENT_REGION = 'mainMap/UPDATE_CURRENT_REGION'
export const UPDATE_MAP_ROUTE = 'mainMap/UPDATE_MAP_ROUTE'
export const UPDATE_TAXIS = 'mainMap/UPDATE_TAXIS'

// ------------------------------------
// Actions
// ------------------------------------

export const updateMainMap = createAction(UPDATE_MAIN_MAP)
export const updateCurrentLocation = createAction(UPDATE_CURRENT_LOCATION)
export const updateCurrentRegion = createAction(UPDATE_CURRENT_REGION)
export const updateMapRoute = createAction(UPDATE_MAP_ROUTE)
export const updateTaxis = createAction(UPDATE_TAXIS)

export const getNearbyTaxi = ({ latitude, longitude } = {}) => {
  return (dispatch, getState) => {
    const allPosibleLocation = [
      () => ({ latitude, longitude }),
      () => (getState().get('newTransaction').get('pick_up', Map()).get('geometry', Map()).get('location', Map()).toJS()),
      () => (getState().get('mainMap').get('currentLocation', Map()).toJS())
    ]

    const location = _.find(allPosibleLocation, item => {
      return _.size(_.omitBy(item(), _.isNil))
    })

    console.log(location && location())

    if (_.isNil(location)) {
      return
    }

    // return request.get('/searchtaxi')
    //   .query(location())
    //   .end((err, res) => {
    //     if (err) {
    //       console.error(err)
    //       return
    //     }
    //     console.log(res)
    //     // dispatch(updateTaxis(res)) //Upload taxis data to redux stores
    //   })
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
  },
  [UPDATE_TAXIS]: (state, { payload }) => {
    return state.set('taxis', fromJS(payload))
  },
  [UPDATE_CURRENT_LOCATION]: (state, { payload }) => {
    if (_.every(payload, value => value > 0)) {
      return state.set('currentLocation', fromJS(payload))
    } else {
      return state
    }
  },
  [UPDATE_CURRENT_REGION]: (state, { payload }) => {
    if (_.every(payload, value => value > 0)) {
      return state.set('currentRegion', fromJS(payload))
    } else {
      return state
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  currentRegion: { latitude: 13.7563, longitude: 100.5018, latitudeDelta: 0.0430, longitudeDelta: 0.0275 },
  currentLocation: {},
  map_route: [],
  taxis: []
})

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
