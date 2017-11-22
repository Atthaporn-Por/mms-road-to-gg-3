import React from 'react'
import { List, fromJS } from 'immutable'
import { Facebook, Google } from 'expo'
import PropTypes from 'prop-types'

import { Image, StyleSheet, View, Alert } from 'react-native'
import {
  Left,
  Body,
  Right,
  Content,
  Label,
  Item,
  Text,
  Button,
  InputGroup,
  Input
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

import MainScreenLayout from 'layouts/MainScreenLayout'

export class LoginScreen extends React.Component {
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
          Alert.alert('Logged in!', `Hi ${profile.name}!`)
          console.log('User token :', token)
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
          Alert.alert('Logged in!', `Hi ${user.name}!`)
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
  render () {
    return (
      <MainScreenLayout >
        <Content style={styles.container}>
          <View style={[styles.loginBtnCon, styles.con]}>
            <Button transparent style={styles.loginButton} onPress={this._handleFacebookLogin}>
              <Icon name='facebook-official' style={[styles.fbIcon, styles.icon]} />
            </Button>
            <Button transparent style={styles.loginButton} onPress={this._handleGoogleLogin}>
              <Icon name='google-plus-official' style={[styles.googleIcon, styles.icon]} />
            </Button>
          </View>
          <Item rounded style={styles.container}>
            <Input placeholder='Username' />
          </Item>
          <Item rounded style={styles.container}>
            <Input placeholder='Password' secureTextEntry />
          </Item>
          <View style={styles.con}>
            <Button primary style={styles.loginButton}>
              <Text>
                Log-in
              </Text>
            </Button>
          </View>
        </Content>
      </MainScreenLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: '2.5%'
  },
  loginBtnCon: {
    justifyContent: 'space-around',
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
  loginButton: {
    marginHorizontal: 10
  },
  icon: {
    fontSize: 60
  },
  fbIcon: {
    color: '#3b5998'
  },
  googleIcon: {
    color: '#DD4B35'
  },
  p: {
    alignItems: 'center',
    flexDirection: 'column'
  }
})

// LoginScreen.propTypes = {
//
// }
//
// LoginScreen.defaultProps = {
//
// }
//
export default LoginScreen
