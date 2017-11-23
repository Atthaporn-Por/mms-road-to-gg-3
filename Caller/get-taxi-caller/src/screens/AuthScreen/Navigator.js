import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DrawerNavigator, NavigationActions } from 'react-navigation'

import SideBar from './screens/SideBar'

import MainScreen from './screens/MainScreen'
import SettingsScreen from './screens/SettingsScreen'
import HistoryScreen from './screens/HistoryScreen'
import LogoutScreen from './screens/LogoutScreen'

const AuthScreenNavigator = DrawerNavigator(
  {
    MainScreen: { screen: MainScreen },
    SettingsScreen: { screen: SettingsScreen },
    HistoryScreen: { screen: HistoryScreen },
    LogoutScreen: { screen: LogoutScreen }
  },
  {
    initialRouteName: 'MainScreen',
    contentComponent: props => <SideBar {...props} />,
    headerMode: 'none'
  }
)

export class AuthScreen extends React.Component {
  static propTypes = {
    isLoggedin: PropTypes.string,
    dispatch: PropTypes.func
  }

  componentWillMount () {
    if (!this.props.isLoggedin) {
      this.props.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'UnAuthScreen' })]
      }))
    }
  }

  render () {
    return this.props.isLoggedin ? <AuthScreenNavigator /> : null
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoggedin: state.get('authentication').get('accessToken')
})

export default connect(mapStateToProps)(AuthScreen)
