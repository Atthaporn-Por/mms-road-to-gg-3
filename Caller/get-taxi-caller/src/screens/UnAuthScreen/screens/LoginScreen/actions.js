import { Alert } from 'react-native'
import { Facebook, Google } from 'expo'

import { updateUserLogin, login, oauthLogin } from 'stores/authentication'

export const handleFacebookLogin = () => {
  return async (dispatch, getState) => {
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

          dispatch(updateUserLogin({
            oauthLogin: token
          }))

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
}

export const handleGoogleLogin = () => {
  return async (dispatch, getState) => {
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
          console.log(user)

          dispatch(updateUserLogin({
            oauthLogin: user
          }))

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
}
