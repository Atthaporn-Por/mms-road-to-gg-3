import React from 'react'
import { StackNavigator } from 'react-navigation'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import FirstWelcomeScreen from './screens/FirstWelcomeScreen'

export default StackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    FirstWelcomeScreen: { screen: FirstWelcomeScreen }
  },
  {
    initialRouteName: 'FirstWelcomeScreen',
    headerMode: 'none'
  }
)
