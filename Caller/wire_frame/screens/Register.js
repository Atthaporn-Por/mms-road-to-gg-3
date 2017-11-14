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
            <Title>Register</Title>
          </Body>
          <Right />

        </Header>
        <View style={styles.head}>
          <Text>Register with</Text>
        </View>
        <View style={styles.oaught>
           <Button
          title="Login with Facebook"
          onPress={this._handleFacebookLogin}/>
         <Button
          title="Login with Google"
          onPress={this._handleGoogleLogin}/>
      </View>
      <View style:{styles.or}>
        <Text>or</Text>
      </View>
      <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Phone Number</Label>
              <Input />
            </Item>
          </Form>
          <Button block style={{ margin: 15, marginTop: 50,backgroundColor:"#F7D31B" }}>
            <Text style={{fontcolor:#025339}}>Register</Text>
          </Button>
        </Content>
      </Container>
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
  head :{
    marginTop: "10%",
    textAlign: "Left",
    fontSize:30,
    fontcolor:"#000000"
  },
  oaught:{
    marginTop:"5%"
    width: "90%",
    height: "20%",
  }
  or:{
    marginTop:"5%"
    textAlign: "center",
    fontSize:30,
    fontcolor:"#000000"

  }

});
