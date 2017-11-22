import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'

import RootNavigation from 'navigation/RootNavigation'

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    nav: PropTypes.object
  }

  static defaultProps = {
    nav: {}
  }

  render () {
    return (
      <RootNavigation navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav
      })} />
    )
  }
}

const mapStateToProps = (state) => ({
  nav: state.get('navigation')
})

export default connect(mapStateToProps)(App)
