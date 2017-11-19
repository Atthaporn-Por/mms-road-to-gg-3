import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { StyleSheet, Image, TouchableHighlight, View } from 'react-native'

import {
  Container, Content, Button, Form, Item, Input, Label
} from 'native-base'

export class CallButtonsPanel extends React.Component {
  render () {
    const { navigation } = this.props

    return (
      <View style={[styles.container, this.props.style]}>
        <Button transparent
          style={styles.button}
          onPress={() => navigation.navigate('FreeCallScreen')}>
          <Image resizeMode='contain' style={styles.buttonImage} source={require('assets/buttons/call.png')} />
        </Button>
        <Button transparent
          style={styles.button}
          onPress={() => navigation.navigate('BookingScreen')}>
          <Image resizeMode='contain' style={styles.buttonImage} source={require('assets/buttons/booking.png')} />
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  button: {
    flex: 1,
    height: 65 * 1.00,
    marginVertical: 5
  },
  buttonImage: {
    width: 211 * 1.00,
    height: 65 * 1.00
  }
})

CallButtonsPanel.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ]),
  navigation: PropTypes.object,
  newTransaction: PropTypes.instanceOf(Map)
}

CallButtonsPanel.defaultProps = {
  mainMap: Map()
}

export default CallButtonsPanel
