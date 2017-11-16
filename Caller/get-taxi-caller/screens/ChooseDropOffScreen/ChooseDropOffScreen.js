import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'

import PopupLayout from 'components/PopupLayout'
import GoogleAutoPick from 'components/GoogleAutoPick'

export class ReactComponent extends React.Component {
  render () {
    return (
      <PopupLayout title='Drop Off Location' onPressBack={() => this.props.navigation.goBack()}>
        <GoogleAutoPick
          predefinedPlaces={this.props.favorite_places.toJS()}
          onPress={(data, details = null) => {
            this.props.updateDropOff(details)
            this.props.navigation.goBack()
          }} />
      </PopupLayout>
    )
  }
}

ReactComponent.propTypes = {
  navigation: PropTypes.object,
  favorite_places: PropTypes.instanceOf(List),

  updateDropOff: PropTypes.func
}

ReactComponent.defaultProps = {
  favorite_places: List()
}

export default ReactComponent
