import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'

import PopupLayout from 'layouts/PopupLayout'
import GoogleAutoPick from 'components/GoogleAutoPick'

export class ReactComponent extends React.Component {
  render () {
    return (
      <PopupLayout title='Pick Up Location' onPressBack={() => this.props.navigation.goBack()}>
        <GoogleAutoPick
          predefinedPlaces={this.props.favorite_places.toJS()}
          onPress={(data, details = null) => {
            this.props.updatePickUp(details)
            this.props.getDirections()
            this.props.navigation.goBack()
          }} />
      </PopupLayout>
    )
  }
}

ReactComponent.propTypes = {
  navigation: PropTypes.object,
  favorite_places: PropTypes.instanceOf(List),

  updatePickUp: PropTypes.func,
  getDirections: PropTypes.func
}

ReactComponent.defaultProps = {
  favorite_places: List()
}

export default ReactComponent
