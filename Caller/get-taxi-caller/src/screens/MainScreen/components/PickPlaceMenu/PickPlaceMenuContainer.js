import { connect } from 'react-redux'

import PickPlaceMenu from './PickPlaceMenu'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  newTransaction: state.get('newTransaction')
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PickPlaceMenu)
