import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { StyleSheet, Image, View } from 'react-native'
import { Button, Text } from 'native-base'

import styles from '../styles'

export class FreeCallButton extends React.Component {
  shouldBeBooking () {
    const { newTransaction } = this.props
    return (newTransaction.get('pick_up').size && newTransaction.get('drop_off').size)
  }

  render () {
    return (
      <Button transparent disabled={!this.shouldBeBooking()}
        style={[styles.button, this.props.style]}
        onPress={() => this.props.makeBookingCall()}>
        <Image resizeMode='contain' style={styles.buttonImage} source={require('assets/buttons/booking.png')} />
        <View style={!this.shouldBeBooking() && styles.disabledButton} />
      </Button>
    )
  }
}

FreeCallButton.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ]),
  navigation: PropTypes.object,
  newTransaction: PropTypes.instanceOf(Map),

  makeBookingCall: PropTypes.func
}

FreeCallButton.defaultProps = {
  mainMap: Map()
}

export default FreeCallButton
