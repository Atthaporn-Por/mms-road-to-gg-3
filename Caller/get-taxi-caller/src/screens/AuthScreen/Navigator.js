import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DrawerNavigator, NavigationActions } from 'react-navigation'

import SideBar from './screens/SideBar'

import MainScreen from './screens/MainScreen'
import SettingsScreen from './screens/SettingsScreen'
import HistoryScreen from './screens/HistoryScreen'

const AuthScreenNavigator = DrawerNavigator(
  {
    MainScreen: { screen: MainScreen },
    SettingsScreen: { screen: SettingsScreen },
    HistoryScreen: { screen: HistoryScreen }
  },
  {
    initialRouteName: 'MainScreen',
    contentComponent: props => <SideBar {...props} />,
    headerMode: 'none'
  }
)

export class AuthScreen extends React.Component {
  componentDidMount () {
    // this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'UnAuthScreen' }))
    this.props.dispatch(NavigationActions.navigate({ routeName: 'UnAuthScreen' }))
  }

  render () {
    return (
      <AuthScreenNavigator />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  accessToken: state.get('authentication').get('accessToken')
})

// const mapDispatchToProps = (dispatch) => ({
//   goToUnAuthPage: dispatch(NavigationActions.navigate({ routeName: 'UnAuthScreen' }))
// })

export default connect(mapStateToProps)(AuthScreen)
