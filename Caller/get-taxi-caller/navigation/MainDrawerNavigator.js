import React from 'react'
import { DrawerNavigator } from 'react-navigation'

import SideBar from 'screens/SideBar'

import MainMapStackNavigator from './MainMapStackNavigator'
import SettingsScreen from 'screens/SettingsScreen'
import HistoryScreen from 'screens/HistoryScreen'

export default DrawerNavigator(
  {
    MainScreen: { screen: MainMapStackNavigator },
    SettingsScreen: { screen: SettingsScreen },
    HistoryScreen: { screen: HistoryScreen }
  },
  {
    initialRouteName: 'MainScreen',
    contentComponent: props => <SideBar {...props} />,
    headerMode: 'none'
  }
)
