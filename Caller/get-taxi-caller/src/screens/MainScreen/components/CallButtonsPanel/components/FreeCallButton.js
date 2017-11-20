import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { StyleSheet, Image, View } from 'react-native'
import { Button, Text } from 'native-base'

import importedStyles from '../styles'

export class FreeCallButton extends React.Component {
  _makeFreeCall () {
    // this.props.
  }

  getCountDownText () {
    return <Text style={styles.countDownText}>60</Text>
  }

  render () {
    const { free_call_time } = this.props

    return (
      <Button transparent disabled={free_call_time}
        style={[styles.button, this.props.style]}
        onPress={() => this._makeFreeCall()}>
        <Image resizeMode='contain' style={[styles.buttonImage, free_call_time ? style.buttonCountDown : null]} source={require('assets/buttons/call.png')}>
          {free_call_time ? this.getCountDownText() : null}
        </Image>
      </Button>
    )
  }
}

const styles = StyleSheet.create({
  ...importedStyles,
  countDownText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 65 * 1.00,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    flex: 1
  }
})

FreeCallButton.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ]),
  navigation: PropTypes.object,
  // newTransaction: PropTypes.instanceOf(Map)

  makeFreeCall: PropTypes.func,
  makeBookingCall: PropTypes.func
}

FreeCallButton.defaultProps = {
  mainMap: Map()
}

export default FreeCallButton
