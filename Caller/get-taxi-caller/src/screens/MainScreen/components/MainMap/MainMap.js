import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { isEqual } from 'lodash'

import Icon from 'react-native-vector-icons/FontAwesome'
import { Constants, Location, Permissions } from 'expo'
import { StyleSheet, View } from 'react-native'
import {
  Content, Footer, Left, Body, Title,
  Text, Button
} from 'native-base'

import MapView, { Marker } from 'react-native-maps'
import Polyline from '@mapbox/polyline'
import Dimensions from 'Dimensions'

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }

let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.05 // Very high zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export class MainMap extends React.Component {
  componentDidMount () {
    this.props.getNearbyTaxi()
    this.setState({
      getNearbyTaxiInterval: setInterval(() => {
        this.props.getNearbyTaxi()
      }, 10000)
    })
  }

  componentWillUnmount () {
    clearInterval(this.state.getNearbyTaxiInterval)
  }

  state = {
    mapRegion: { latitude: 13.756300, longitude: 100.501800, latitudeDelta:  LATITUDE_DELTA, longitudeDelta:  LONGITUDE_DELTA},
    //mapRegion: { latitude: 63.756300, longitude: 60.501800, latitudeDelta: 0.04, longitudeDelta: 0.04 },
    getNearbyTaxiInterval: null
  }

  locationChanged = (location) => {
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
    this.setState({ location, region })
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion })
  }

  getPickUpPin () {
    const { newTransaction } = this.props

    if (newTransaction.get('pick_up', Map()).size === 0) {
      return
    }

    const pickUpLatLong = newTransaction.getIn(['pick_up', 'geometry', 'location'])

    return (
      pickUpLatLong && pickUpLatLong.size &&
        <Marker
          coordinate={pickUpLatLong.toJS()}
          title='Pickup'
          description={'Your pickup location '} >
          <Icon name='map-marker' size={30} color='blue' />
        </Marker>
    ) || null
  }

  getDropOffPin () {
    const { newTransaction } = this.props

    if (newTransaction.get('drop_off', Map()).size === 0) {
      return
    }

    const dropOffLatLong = newTransaction.getIn(['drop_off', 'geometry', 'location'])

    return (
      dropOffLatLong && dropOffLatLong.size &&
        <Marker
          coordinate={dropOffLatLong.toJS()}
          title='Drop off'
          description={'Your drop off location '} >
          <Icon name='map-marker' size={30} />
        </Marker>
    ) || null
  }

  getMapRoute () {
    const { mainMap } = this.props
    const mapRoute = mainMap.get('map_route')

    return (
      mapRoute && mapRoute.size &&
      <MapView.Polyline
        coordinates={mapRoute.toJS()}
        strokeWidth={3}
        strokeColor='red' />
    ) || null
  }

  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <MapView showsUserLocation
          style={styles.map}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}>
          {this.getPickUpPin()}
          {this.getDropOffPin()}
          {this.getMapRoute()}
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
  style: PropTypes.number,
  children: PropTypes.node,
  mainMap: PropTypes.instanceOf(Map),
  newTransaction: PropTypes.instanceOf(Map),

  getNearbyTaxi: PropTypes.func
}

MainMap.defaultProps = {
  mainMap: Map(),
  newTransaction: Map()
}

export default MainMap
