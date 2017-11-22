import { connect } from 'react-redux'
import { Map } from 'immutable'

import LoginScreen from './LoginScreen'

import { login, oauthLogin, logout } from 'stores/authentication'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
