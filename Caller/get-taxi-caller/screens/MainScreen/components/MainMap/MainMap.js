import React from 'react'
import PropTypes from 'prop-types'
import { Constants, Location, Permissions } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet, View } from 'react-native'
import {
  Content, Footer, Left, Body, Title,
  Text, Button
} from 'native-base'

import MapView, { Marker } from 'react-native-maps'
import Polyline from '@mapbox/polyline'

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }

export class MainMap extends React.Component {
  state = {
    mapRegion: { latitude: 13.7563, longitude: 100.5018, latitudeDelta: 0.1, longitudeDelta: 0.05 },
    pickUpLatLong: { latitude: 13.7563, longitude: 100.5018 },
    dropOffLatLong: { latitude: 13.7563, longitude: 100.5018 }
  }

  componentWillMount () {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged)
  }

  locationChanged = (location) => {
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05
    }
    this.setState({ location, region })
    this.getDirections(`${region.latitude},${region.longitude}`, '13.7563,100.5020')
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion })
  }

  async getDirections (startLoc, destinationLoc) {
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
      let respJson = await resp.json()
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points)
      let coords = points.map((point, index) => {
        return {
          latitude : point[0],
          longitude : point[1]
        }
      })
      console.log('coords', coords)
      this.setState({ coords })
      return coords
    } catch (error) {
      alert(error)
      return error
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <MapView showsUserLocation
          style={styles.map}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}>
          <Marker
            coordinate={this.state.dropOffLatLong}
            title='Drop off'
            description={'Your drop off location '} >
            <Icon name='map-marker' size={30} />
          </Marker>
          <Marker
            coordinate={this.state.pickUpLatLong}
            title='Pickup'
            description={'Your pickup location '} >
            <Icon name='map-marker' size={30} color='blue' />
          </Marker>
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={3}
            strokeColor='red' />
          <View style={styles.overMap}>
            {this.props.children}
          </View>
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  overMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: null
  }
})

MainMap.propTypes = {
  children: PropTypes.node
}

export default MainMap
