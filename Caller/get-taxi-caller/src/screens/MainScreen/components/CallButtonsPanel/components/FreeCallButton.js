import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Moment from 'moment'
import { StyleSheet, Image, View } from 'react-native'
import { Button, Text } from 'native-base'

import importedStyles from '../styles'

export class FreeCallButton extends React.Component {
  constructor (props) {
    super(props)
    const counter = Moment().diff(Moment(props.freeCallStamp), 'seconds')
    const timer = counter < 3 * 60 &&
      setInterval(this.tick, 1000)

    this.state = {
      timer,
      counter
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }

  componentsDidMount () {

  }

  tick = () => {
    this.setState({
      counter: this.state.counter - 1
    })
  }

  _makeFreeCall () {
    // this.props.
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
        onPress={() => this._makeFreeCall()}>
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

  makeFreeCall: PropTypes.func
}

FreeCallButton.defaultProps = {
  freeCallStamp: Moment().subtract({ minutes: 2 }).toISOString(),
  mainMap: Map()
}

export default FreeCallButton
