import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Subtitle
  Item,
  Label,
  Input,
  Form,
} from "native-base"; // 2.3.3
import { Constants } from 'expo';

export default class App extends Component {
   _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };
 _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      switch (type) {
        case 'success': {
          Alert.alert(
            'Logged in!',
            `Hi ${user.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
      <Header hasSubtitle>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Find Taxi</Title>
          </Body>
          <Right />

        </Header>
       <Image
          source={require("../assets/gettaxi_logo_wait.png" )}
          style={styles.logo}/>
        <View {{marginTop: "15%"}}>
          <Image
            source={require("../assets/Button_6.png" )}
            style={styles.buttonLogin}/>
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
  logo:{
    marginTop:"25%",
    width: "70%",
    height: "50%",
    resizeMode: 'contain'
  
  },
  buttonLogin:{
    marginTop:"0%",
    width: "20%",
    height: "10%",
    resizeMode: 'contain'
  }

});
