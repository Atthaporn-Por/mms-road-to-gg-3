import { connect } from 'react-redux'

import LoginScreen from './LoginScreen'

import { login, oauthLogin, updateUserLogin } from 'stores/authentication'
import { handleGoogleLogin, handleFacebookLogin } from './actions/login'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = {
  oauthLogin,
  updateUserLogin,
  login,
  handleGoogleLogin,
  handleFacebookLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
