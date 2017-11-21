import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Moment from 'moment'
import { StyleSheet, Image, View, Alert } from 'react-native'
import { Button, Text } from 'native-base'

import importedStyles from '../styles'

export class FreeCallButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      timer: null,
      counter: 0
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }

  componentDidMount () {
    this.setTimer()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.freeCallStamp !== this.props.freeCallStamp) {
      this.setTimer({ freeCallStamp: nextProps.freeCallStamp })
    }
  }

  setTimer ({ freeCallStamp = this.props.freeCallStamp } = {}) {
    if (_.isNil(freeCallStamp)) {
      return
    }

    const counter = 5 - Moment().diff(Moment(freeCallStamp), 'seconds')
    const timer = counter > 0 &&
      setInterval(this.tick, 1000)

    this.setState({
      counter,
      timer
    })
  }

  tick = () => {
    const counter = this.state.counter - 1
    this.setState({ counter })

    if (this.state.counter <= 0) {
      this.countingCompleted()
    }
  }

  countingCompleted = () => {
    clearInterval(this.state.timer)
    this.setState({ timer: null })

    this.props.clearReservation()

    Alert.alert('Make another free call', 'Do you want to make call again', [
      { text: 'Call Again', onPress: () => this.props.makeFreeCall() },
      { text: 'Cancel', style: 'cancel' }
    ])
  }

  getCountDownText () {
    return <View style={styles.disabledButton}>
      <Text style={styles.countDownText}>{this.state.counter}</Text>
    </View>
  }

  render () {
    const { timer } = this.state

    return (
      <Button transparent disabled={timer && true}
        style={[styles.button, this.props.style]}
        onPress={() => this.props.makeFreeCall()}>
        <Image resizeMode='contain' style={[styles.buttonImage, timer ? styles.buttonCountDown : null]} source={require('assets/buttons/call.png')}>
          {timer ? this.getCountDownText() : null}
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
    flex: 1,
    padding: 0
  }
})

FreeCallButton.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ]),
  freeCallStamp: PropTypes.string,

  makeFreeCall: PropTypes.func,
  clearReservation: PropTypes.func
}

FreeCallButton.defaultProps = {
  // freeCallStamp: Moment().subtract({ seconds: 2 * 60 + 50 }).toISOString(),
  mainMap: Map()
}

export default FreeCallButton
