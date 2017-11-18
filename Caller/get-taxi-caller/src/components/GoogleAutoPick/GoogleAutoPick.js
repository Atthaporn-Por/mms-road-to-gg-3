import React from 'react'
import PropTypes from 'prop-types'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export class GoogleAutoPick extends React.Component {
  render () {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='auto' // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={this.props.onPress}
        getDefaultValue={() => {
          return '' // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyC2QhtACfVZ2cr9HVvxQuzxd3HT36NNK3Q',
          language: 'th', // language of the results
          types: 'establishment' // default: 'geocode'
          // types: '(cities)' // default: 'geocode'
        }}
        styles={{
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel='Current location'
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          // region: 'en'
        }}
        filterReverseGeocodingByTypes={[
          'locality'
          // 'administrative_area_level_3'
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        predefinedPlaces={this.props.predefinedPlaces}
        debounce={200}
      />
    )
  }
}

GoogleAutoPick.propTypes = {
  onPress: PropTypes.func,
  predefinedPlaces: PropTypes.array
}

GoogleAutoPick.defaultProps = {
}

export default GoogleAutoPick
