import React from 'react'
import { StackNavigator } from 'react-navigation'

import MainScreen from 'screens/MainScreen'
import ChoosePickUpScreen from 'screens/ChoosePickUpScreen'
import ChooseDropOffScreen from 'screens/ChooseDropOffScreen'

export default StackNavigator(
  {
    MainScreen: { screen: MainScreen },
    ChoosePickUpScreen: { screen: ChoosePickUpScreen },
    ChooseDropOffScreen: { screen: ChooseDropOffScreen }
  }, {
    headerMode: 'none'
  }
)
