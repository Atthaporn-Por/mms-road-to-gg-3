import React from 'react'
import { List, fromJS } from 'immutable'
import PropTypes from 'prop-types'
import { Constants } from 'expo'
import { Image, StyleSheet, View } from 'react-native'
import {
  Left, Body, Right, Content, Label, Item,
  Text, Button, InputGroup, Input
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Col, Row, Grid } from 'react-native-easy-grid'

import MainScreenLayout from 'layouts/MainScreenLayout'

export class WaitingTaxiAcceptScreen extends React.Component {
  render () {
    return (
      <MainScreenLayout >
        <View style={styles.container}>
          <Image
            source={require('/assets/images/gettaxi_logo_2.png')}
            style={styles.logo}
          />
          <View style={styles.button1} >
            <Button transparent >
              <Image
                source={require('/assets/buttons/cancel2.png')}
              />
            </Button>
          </View>
        </View>
      </MainScreenLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight
  },
  button1: {
    marginTop: '10%',
    width: '60%',
    resizeMode: 'contain'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  space:{
    width: 100,
    height: 100,
    backgroundColor: 'black'
  },
  logo:{
    marginTop:'10%',
    width: '50%',
    height:'50%',
    resizeMode: 'contain'

  }

})

// LoginScreen.propTypes = {
//
// }
//
// LoginScreen.defaultProps = {
//
// }
//
export default WaitingTaxiAcceptScreen
