import Moment from 'moment'
import { Location, Permissions } from 'expo'
import { createAction } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'

import request from 'utils/request'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_FREE_CALL_STAMP = 'reservation/UPDATE_FREE_CALL_STAMP'
export const UPDATE_RESERVARION = 'reservation/UPDATE_RESERVARION'
export const CLEAR_RESERVARION = 'reservation/CLEAR_RESERVARION'

// ------------------------------------
// Actions
// ------------------------------------
export const updateFreeCallStamp = createAction(UPDATE_FREE_CALL_STAMP)
export const updateReservation = createAction(UPDATE_RESERVARION)
export const clearReservation = createAction(CLEAR_RESERVARION)

export const makeFreeCall = () => {
  return (dispatch, getState) => {
    // const freeCallStamp = getState().get('mainMap').get('freeCallStamp')

    // if (!_.isNil(freeCallStamp) && (3 * 60 - Moment().diff(Moment(freeCallStamp), 'seconds')) > 0) {
    //   console.log(Moment().diff(Moment(freeCallStamp), 'seconds'))
    //   return null
    // }

    const location = getCurrentLocation()

    if (_.isNull(location)) {
      alert('Please turn Location on and give Permissions')
      return null
    }

    const freeCallTimeStamp = Moment().toISOString()

    // return request.put('/user')
    //   .send({
    //     location,
    //     free_call_time_stamp: freeCallTimeStamp
    //   })
    //   .then(res => {
    //     dispatch(updateFreeCallStamp(freeCallTimeStamp))
    //   })
    //   .catch(error => {
    //     console.error(error)
    //     alert(error)
    //   })
    dispatch(updateFreeCallStamp(freeCallTimeStamp))
  }
}

export const makeBookingCall = () => {
  return (dispatch, getState) => {
    const newTransaction = getState().get('newTransaction')
    if (!(newTransaction.get('pick_up').size && newTransaction.get('drop_off').size)) {
      return null
    }


  }
}

async function getCurrentLocation () {
  const { status } = await Permissions.askAsync(Permissions.LOCATION)
  if (status === 'granted') {
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true })
  } else {
    return null
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_FREE_CALL_STAMP]: (state, { payload }) => {
    return state.set('freeCallStamp', payload)
  },
  [UPDATE_RESERVARION]: (state, { payload }) => {
    return state.merge(fromJS(payload))
  },
  [CLEAR_RESERVARION]: (state, { payload }) => {
    return initialState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  freeCallStamp: undefined
})

export default function interfaceReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
