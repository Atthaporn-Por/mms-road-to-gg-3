import React from 'react'
import { StyleSheet, View, Alert, Image } from 'react-native'
import { Text, Button } from 'native-base'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import Moment from 'moment'

import { brandGreen, brandYellow } from 'themes/variables'

export default class FreeCallCountDown extends React.Compoent {
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

  render () {
    return (
      <View style={styles.frame}>
        <Icon name='clock-o' style={[styles.timeIcon]} />
        <Text style={styles.waitText}>ท่านรอรถมาแล้ว..{this.state.counter}</Text>
        <Button transparent >
          <Image
            source={require('assets/buttons/cancel.png')}
          />
        </Button>
      </View>
    )
  }
}

FreeCallCountDown.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ]),
  freeCallStamp: PropTypes.string,

  makeFreeCall: PropTypes.func,
  clearReservation: PropTypes.func
}
FreeCallCountDown.defaultProps = {
  // freeCallStamp: Moment().subtract({ seconds: 2 * 60 + 50 }).toISOString(),
  mainMap: Map()
}

const styles = StyleSheet.create({
  frame:{
    flex: 1,
    flexDirection :'colum',
    alignSelf: 'center',
    marginTop:'70%',
    width :'100%',
    height:'30%',
    backgroundColor: brandGreen
  },
  timeIcon:{
    fontSize : 30,
    margin:10
  },
  waitText:{
    fontSize:20,
    color: brandYellow,
    margin:10
  }
})
