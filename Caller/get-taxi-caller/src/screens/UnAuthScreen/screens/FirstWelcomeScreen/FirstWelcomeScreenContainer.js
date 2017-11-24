import { connect } from 'react-redux'

import FirstWelcomeScreen from './FirstWelcomeScreen'

import { clear as clearAuthentication } from 'stores/authentication'
import { clear as clearRegister } from 'stores/register'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = {
  clearAuthentication,
  clearRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstWelcomeScreen)
