import React from 'react'
import { DrawerNavigator } from 'react-navigation'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import FirstWelcomeScreen from './screens/FirstWelcomeScreen'

export default DrawerNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    FirstWelcomeScreen: { screen: FirstWelcomeScreen }
  },
  {
    initialRouteName: 'LoginScreen'
  }
)
