import { connect } from 'react-redux'
import { Map } from 'immutable'

import MainMap from './MainMap'

import {
  updateMapRoute, updateCurrentRegion, updateCurrentLocation,
  getDirections, getNearbyTaxi
} from 'screens/MainScreen/actions/mainMap'

const mapStateToProps = (state, ownProps) => {
  const mainMap = state.get('mainMap', Map())
  return {
    ...ownProps,
    newTransaction: state.get('newTransaction'),
    mapRoute: mainMap.get('map_route'),
    currentRegion: mainMap.get('currentRegion'),
    currentLocation: mainMap.get('currentLocation')
  }
}

const mapDispatchToProps = {
  updateMapRoute,
  getDirections,
  getNearbyTaxi,
  updateCurrentRegion,
  updateCurrentLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMap)
