import { connect } from 'react-redux'

import LoginScreen from './LoginScreen'

import { login, updateUserLogingin } from 'stores/authentication'
import { handleGoogleLogin, handleFacebookLogin } from './actions/login'

const mapStateToProps = (state, ownProps) => ({
  signInLoading: state.get('authentication').get('signInLoading'),
  userLogingin: state.get('authentication').get('userLogingin')
})

const mapDispatchToProps = {
  login,
  updateUserLogingin,
  handleGoogleLogin,
  handleFacebookLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
