import { connect } from 'react-redux'
import { Map } from 'immutable'

import ChooseDropOffScreen from './ChooseDropOffScreen'

import { updateDropOff } from 'screens/MainScreen/actions/mainMap'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  favorite_places: state.get('user', Map()).get('favorite_places')
})

const mapDispatchToProps = {
  updateDropOff
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDropOffScreen)
