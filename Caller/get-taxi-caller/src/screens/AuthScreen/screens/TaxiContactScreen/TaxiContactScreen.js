import React from 'react'
import { Constants } from 'expo'
import { Image, StyleSheet, View } from 'react-native'
import {
  Text, Button
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

import MainScreenLayout from 'layouts/MainScreenLayout'

export class TaxiContactScreen extends React.Component {
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
          <Text style={styles.thxMsg}>
            เย้ได้คนขับแล้ว
          </Text>
          <View style={styles.button1} >
            <Button style={styles.buttonStyle}>
              <Text style={{textAlign:'center'}}>
                โทร
              </Text>
            </Button>
            <Button style={styles.buttonStyle}>
              <Text>
                ส่งข้อความ
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor:'yellow',
  },
  button1: {
    marginTop: 10,
    flexDirection:'column'
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
    width: '35%',
    height:'20%',
    resizeMode: 'contain'
  },
  profilePic:{
    width: '30%',
    margin:'5%',
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
  buttonStyle:{
    marginTop :10,
    width:100,
    height:50
  },
  thxMsg :{
    fontSize:15,
    color:'#025339',
    textAlign:'center',
    marginTop:'5%'
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
export default TaxiContactScreen
