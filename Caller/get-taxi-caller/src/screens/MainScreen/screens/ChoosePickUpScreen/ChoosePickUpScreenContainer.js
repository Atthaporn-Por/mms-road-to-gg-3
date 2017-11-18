import { connect } from 'react-redux'
import { Map } from 'immutable'

import ChoosePickUpScreen from './ChoosePickUpScreen'

import { getDirections } from 'screens/MainScreen/actions/mainMap'
import { updatePickUp } from 'stores/newTransaction'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  favorite_places: state.getIn(['authentication', 'currentUser'], Map()).get('favorite_places')
})

const mapDispatchToProps = {
  updatePickUp,
  getDirections
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePickUpScreen)
