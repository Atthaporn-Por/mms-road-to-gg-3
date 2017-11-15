import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import {
  Content, Footer, Left, Body, Title,
  Text, Button, Icon
} from 'native-base'

import MapView from 'react-native-maps'

export class MainScreen extends React.Component {
  state = {
    mapRegion: { latitude: 13.7563, longitude: 100.5018, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion })
  }

  render () {
    return (
      <Content>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange} />
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    height: 200,
    width: null,
    alignSelf: 'stretch'
  }
})

MainScreen.propTypes = {

}

export default MainScreen
