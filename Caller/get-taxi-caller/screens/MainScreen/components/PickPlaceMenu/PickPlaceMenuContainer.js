import { connect } from 'react-redux'
import { Map } from 'immutable'

import PickPlaceMenu from './PickPlaceMenu'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  mainMap: state.get('mainMap')
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PickPlaceMenu)
