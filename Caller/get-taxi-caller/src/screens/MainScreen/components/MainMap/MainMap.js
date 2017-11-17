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
const LATITUDE_DELTA = 60 //Very high zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export class MainMap extends React.Component {
  state = {
    mapRegion: { latitude: 13.756300, longitude: 100.501800, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA },
    pickUpLatLong: { latitude: 13.7563, longitude: 100.5018 },
    dropOffLatLong: { latitude: 13.7563, longitude: 100.5018 }
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props.mainMap, nextProps.mainMap)) {
      const mainMap = nextProps.mainMap
      if (mainMap.get('pick_up').size && mainMap.get('drop_off').size) {
        console.log('ok')
        const pickUpLocation = mainMap.get('pick_up').get('geometry').get('location')
        const dropOffLocation = mainMap.get('drop_off').get('geometry').get('location')
        this.getDirections(
          `${pickUpLocation.get('latitude')},${pickUpLocation.get('longitude')}`,
          `${dropOffLocation.get('latitude')},${dropOffLocation.get('longitude')}`
        )
      }
      // Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged)
    }
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

      this.props.updateMapRoute(coords)
      console.log(coords);
      return coords
    } catch (error) {
      alert(error)
      return error
    }
  }

  getPickUpPin () {
    const { mainMap } = this.props

    if (mainMap.get('pick_up', Map()).size === 0) {
      return
    }

    const pickUpLatLong = mainMap.getIn(['pick_up', 'geometry', 'location'])

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
    const { mainMap } = this.props

    if (mainMap.get('drop_off', Map()).size === 0) {
      return
    }

    const dropOffLatLong = mainMap.getIn(['drop_off', 'geometry', 'location'])

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
  mainMap: PropTypes.instanceOf(Map)
}

MainMap.defaultProps = {
  mainMap: Map()
}

export default MainMap
