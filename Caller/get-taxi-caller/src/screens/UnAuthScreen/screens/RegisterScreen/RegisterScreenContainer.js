import { connect } from 'react-redux'

import RegisterScreen from './RegisterScreen'

import { submit, updateNewUser } from 'stores/register'
import { handleGoogleLogin, handleFacebookLogin } from '../../actions/login'

const mapStateToProps = (state, ownProps) => ({
  registerLoading: state.get('register').get('loading'),
  newUser: state.get('register').get('newUser')
})

const mapDispatchToProps = {
  submit,
  updateNewUser,
  handleGoogleLogin,
  handleFacebookLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
