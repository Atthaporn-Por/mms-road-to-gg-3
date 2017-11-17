import { connect } from 'react-redux'
import { Map } from 'immutable'

import ChoosePickUpScreen from './ChoosePickUpScreen'

import { updatePickUp } from '../MainScreen/actions/mainMap'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  favorite_places: state.get('user', Map()).get('favorite_places')
})

const mapDispatchToProps = {
  updatePickUp
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePickUpScreen)
