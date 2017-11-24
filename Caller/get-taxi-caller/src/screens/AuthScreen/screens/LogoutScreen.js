import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { clear as clearAuthentication } from 'stores/authentication'

export class LogoutScreen extends React.Component {
  static propTypes = {
    clearAuthentication: PropTypes.func,
    goToUnAuthScreen: PropTypes.func
  }

  componentWillMount () {
    this.props.clearAuthentication()
    this.props.goToUnAuthScreen()
  }

  render () {
    return null
  }
}

export default connect(
  (state, ownProps) => ({ ...ownProps }),
  {
    clearAuthentication,
    goToUnAuthScreen: () => (dispatch) => dispatch(NavigationActions.navigate({ routeName: 'UnAuthScreen' }))
  }
)(LogoutScreen)
