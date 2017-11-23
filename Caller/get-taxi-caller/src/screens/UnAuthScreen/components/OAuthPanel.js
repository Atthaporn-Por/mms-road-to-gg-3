import React from 'react'
import PropTypes from 'prop-types'
import { Alert, StyleSheet, View } from 'react-native'
import { Facebook, Google } from 'expo'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

export class LoginScreen extends React.Component {
  _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })

      switch (type) {
        case 'success': {
          // Alert.alert('Logged in!', `Hi ${user.name}!`)
          this.props.onGoogleLoggedIn(user, user.token)
          break
        }
        case 'cancel': {
          Alert.alert('Cancelled!', 'Login was cancelled!')
          break
        }
        default: {
          Alert.alert('Oops!', 'Login failed!')
        }
      }
    } catch (e) {
      Alert.alert('Oops!', 'Login failed!')
    }
  }

  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('1947365685589353', { // Replace with your own app id in standalone app
        permissions: ['public_profile', 'email']
      })

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?fields=id,name,picture,email&access_token=${token}`)
          const profile = await response.json()
          // Alert.alert('Logged in!', `Hi ${profile.name}!`)
          this.props.onFacebookLoggedIn(profile, token)
          break
        }
        case 'cancel': {
          Alert.alert('Cancelled!', 'Login was cancelled!')
          break
        }
        default: {
          Alert.alert('Oops!', 'Login failed!')
        }
      }
    } catch (e) {
      console.log(e)
      Alert.alert('Oops!', 'Login failed!')
    }
  }

  render () {
    return (
      <View style={[styles.loginBtnCon, styles.con, this.props.style]}>
        <Button transparent style={styles.oAuthBtn} onPress={this._handleFacebookLogin}>
          <Icon name='facebook-official' style={[styles.fbIcon, styles.icon]} />
        </Button>
        <Button transparent style={styles.oAuthBtn} onPress={this._handleGoogleLogin}>
          <Icon name='google-plus-official' style={[styles.googleIcon, styles.icon]} />
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loginBtnCon: {
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    marginBottom: 10
  },
  con: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  oAuthBtn: {
    height: null,
    marginHorizontal: 20
  },
  icon: {
    fontSize: 80
  },
  fbIcon: {
    color: '#3b5998'
  },
  googleIcon: {
    color: '#DD4B35'
  }
})

LoginScreen.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number
  ]),

  onGoogleLoggedIn: PropTypes.func,
  onFacebookLoggedIn: PropTypes.func
}

export default LoginScreen
