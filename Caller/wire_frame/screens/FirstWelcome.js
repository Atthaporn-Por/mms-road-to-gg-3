import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { Constants } from 'expo';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
       
        <Image
          source={require("../assets/gettaxi_logo.png" )}
          style={styles.logo}
        />
     
        <View style = {styles.button1} >
          <Image
            source={require("../assets/Button_4.png" )}
            style={styles.Button_4}
          />
        <Text style= {styles.registerButon}>
         Register
          </Text>
        </View>
      </View>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  button1: {
    marginTop: "15%"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  space:{
    width: 100,
    height: 100,
      backgroundColor: 'black'
  },
  logo:{
    marginTop:"15%",
    width: "70%",
    height: "50%",
    resizeMode: 'contain'
  
  },
  buttonLogin:{
    marginTop:"0%",
    width: "20%",
    height: "10%",
    resizeMode: 'contain'
  
  },
  registerButon:{
    marginTop: "5%",
    textAlign: "center",
    fontSize:15,
    fontcolor:"#025339"
   
    
  }
});
