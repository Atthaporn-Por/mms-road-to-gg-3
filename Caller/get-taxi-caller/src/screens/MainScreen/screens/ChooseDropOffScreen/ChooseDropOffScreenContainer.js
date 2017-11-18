import { connect } from 'react-redux'
import { Map } from 'immutable'

import ChooseDropOffScreen from './ChooseDropOffScreen'

import { updateDropOff, getDirections } from 'screens/MainScreen/actions/mainMap'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  favorite_places: state.get('authentication', Map()).get('favorite_places')
})

const mapDispatchToProps = {
  updateDropOff,
  getDirections
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDropOffScreen)
