import { connect } from 'react-redux'
import { Map } from 'immutable'

import ChooseDropOffScreen from './ChooseDropOffScreen'

import { getDirections } from 'screens/MainScreen/actions/mainMap'
import { updateDropOff } from 'stores/newTransaction'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  favorite_places: state.getIn(['authentication', 'currentUser'], Map()).get('favorite_places')
})

const mapDispatchToProps = {
  updateDropOff,
  getDirections
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDropOffScreen)
