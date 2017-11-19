import React from 'react'
import { DrawerNavigator } from 'react-navigation'

import SideBar from 'screens/SideBar'

import MainScreen from 'screens/MainScreen'
import SettingsScreen from 'screens/SettingsScreen'
import HistoryScreen from 'screens/HistoryScreen'
import LoginScreen from 'screens/LoginScreen'

export default DrawerNavigator(
  {
    MainScreen: { screen: MainScreen },
    SettingsScreen: { screen: SettingsScreen },
    HistoryScreen: { screen: HistoryScreen },
    LoginScreen: { screen: LoginScreen }
  },
  {
    // initialRouteName: 'MainScreen',
    initialRouteName: 'LoginScreen',
    contentComponent: props => <SideBar {...props} />,
    headerMode: 'none'
  }
)
