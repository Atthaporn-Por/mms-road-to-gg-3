import { connect } from 'react-redux'

import CallButtonsPanel from './CallButtonsPanel'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  newTransaction: state.get('newTransaction')
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CallButtonsPanel)
