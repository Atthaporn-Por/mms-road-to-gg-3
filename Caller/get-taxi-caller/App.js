// import { connectToDevTools } from 'react-devtools-core'
import React from 'react'
import { AsyncStorage, Platform, StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { AppLoading, Asset, Font } from 'expo'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
// import RootNavigation from './navigation/MainDrawerNavigator'
import AppWithNavigationState from 'containers/AppWithNavigationState'
import createStore from 'stores/configureStore'

import { HOST_URL } from 'react-native-dotenv'

if (__DEV__) {
  // ========================================================
  // Setup HTTP Debugging on DevTools
  // ========================================================
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest

  // ========================================================
  // Store Instantiation
  // ========================================================
  // connectToDevTools({
  //   host: HOST_URL,
  //   resolveRNStyle: require('flattenStyle')
  // })
}

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Window the AsyncStorage
// ========================================================
window.AsyncStorage = AsyncStorage
console.log('To clear storage : AsyncStorage.clear() \nthen restart app')

// ========================================================
// Render Setup
// ========================================================
export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  render () {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
            <AppWithNavigationState />
          </View>
        </Provider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // glob.sync('assets/buttons/*.*'),
        require('assets/images/robot-dev.png'),
        require('assets/images/robot-prod.png')
      ]),
      Font.loadAsync([
        Ionicons.font,
        FontAwesome.font,
        {
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
        }
      ])
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
})
