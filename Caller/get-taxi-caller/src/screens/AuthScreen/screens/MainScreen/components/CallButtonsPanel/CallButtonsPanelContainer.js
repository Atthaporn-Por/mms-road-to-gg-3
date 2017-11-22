import { connect } from 'react-redux'

import { makeFreeCall, makeBookingCall, clearReservation } from 'stores/reservation'

import CallButtonsPanel from './CallButtonsPanel'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  newTransaction: state.get('newTransaction'),
  reservation: state.get('reservation'),
  freeCallStamp: state.get('reservation').get('freeCallStamp')
})

const mapDispatchToProps = {
  makeFreeCall,
  makeBookingCall,
  clearReservation
}

export default connect(mapStateToProps, mapDispatchToProps)(CallButtonsPanel)
