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

export class RateTaxi extends React.Component {
  render () {
    return (
      <MainScreenLayout >
        <View style={styles.container}>
          <Image
            source={require('/assets/images/gettaxi_logo_2.png')}
            style={styles.logo}
          />
          <View style={styles.profilePicFrame}>
            <Image
              source={require('/assets/images/robot-prod.png')}
              style={styles.profilePic}
            />
            <Text style={{fontSize:13,color:'black'}}> มค 4486 </Text>
          </View>
          <View style={styles.rateView}>
            <Text style={styles.thxMsg}>
              ขอบคุณที่ใช้บริการ
            </Text>
          </View>
          <View style={styles.button1} >
            <Button >
              <Text>
                Review
              </Text>
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
    //justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight
  },
  button1: {
    resizeMode: 'contain',
    margin:50
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
    width: '30%',
    resizeMode: 'contain'

  },
  profilePic:{
    width: '20%',
    resizeMode: 'contain'
  },
  profilePicFrame:{
    alignItems:'center',
    width:'100%'
  },
  rateView:{
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'column',
    marginTop:'5%',
    width: '100%',
    height:'10%',
    backgroundColor :'red'
  },
  thxMsg :{
    fontSize:15,
    color:'#025339',
    textAlign:'center'
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
export default RateTaxi
