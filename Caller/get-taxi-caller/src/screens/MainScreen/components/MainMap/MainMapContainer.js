import { connect } from 'react-redux'
import { Map } from 'immutable'

import MainMap from './MainMap'

import { updateMainMap, updateMapRoute, getDirections, getNearbyTaxi } from 'screens/MainScreen/actions/mainMap'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  mainMap: state.get('mainMap')
})

const mapDispatchToProps = {
  updateMainMap,
  updateMapRoute,
  getDirections,
  getNearbyTaxi
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMap)
