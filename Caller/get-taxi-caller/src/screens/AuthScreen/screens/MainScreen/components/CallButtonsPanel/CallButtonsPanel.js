import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { StyleSheet, Image, View } from 'react-native'
import { Button, Text } from 'native-base'

import styles from './styles'

import FreeCallButton from './components/FreeCallButton'
import BookingCallButton from './components/BookingCallButton'

export class CallButtonsPanel extends React.Component {
  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <FreeCallButton {...this.props} style={undefined} />
        <BookingCallButton {...this.props} style={undefined} />
      </View>
    )
  }
}

CallButtonsPanel.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ]),
  navigation: PropTypes.object,

  makeFreeCall: PropTypes.func,
  makeBookingCall: PropTypes.func
}

CallButtonsPanel.defaultProps = {
  mainMap: Map()
}

export default CallButtonsPanel
