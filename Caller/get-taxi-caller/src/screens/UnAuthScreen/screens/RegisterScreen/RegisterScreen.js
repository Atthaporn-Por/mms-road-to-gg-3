import React from 'react'
import { Map } from 'immutable'
import PropTypes from 'prop-types'

import { Image, StyleSheet, View } from 'react-native'
import {
  Left,
  Body,
  Right,
  Content,
  Label,
  Item,
  Text,
  Button,
  InputGroup,
  Input
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

import PopupLayout from 'layouts/PopupLayout'
import OAuthPanel from '../../components/OAuthPanel'

export class RegisterScreen extends React.Component {
  render () {
    const { newUser, updateNewUser } = this.props

    return (<PopupLayout title='Login' onPressBack={() => this.props.navigation.goBack()}>
      <Content style={styles.container}>
        <View style={{ marginTop: 10, paddingLeft: 10 }}>
          <Text>Login With</Text>
        </View>
        <OAuthPanel
          onFacebookLoggedIn={this.props.handleFacebookLogin}
          onGoogleLoggedIn={this.props.handleGoogleLogin}
        />
        <View style={{
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          marginTop: 10,
          marginBottom: 20
        }} />
        <Item rounded style={styles.container}>
          <Input placeholder='Username'
            value={newUser.get('user')}
            onChangeText={text => updateNewUser({ user: text })}
          />
        </Item>
        <Item rounded style={styles.container}>
          <Input placeholder='Name'
            value={newUser.get('name')}
            onChangeText={text => updateNewUser({ name: text })}
          />
        </Item>
        <Item rounded style={styles.container}>
          <Input placeholder='Email'
            value={newUser.get('email')}
            onChangeText={text => updateNewUser({ email: text })}
          />
        </Item>
        <Item rounded style={styles.container}>
          <Input placeholder='Password' secureTextEntry
            value={newUser.get('password')}
            onChangeText={text => updateNewUser({ password: text })}
          />
        </Item>
        <Item rounded style={styles.container}>
          <Input placeholder='Phone Number'
            value={newUser.get('phone')}
            onChangeText={text => updateNewUser({ phone: text })}
          />
        </Item>
        <View style={styles.con}>
          <Button large primary
            style={styles.loginButton}
            disabled={this.props.registerLoading}
            onPress={() => this.props.submit()}>
            <Text large>
              Register
            </Text>
          </Button>
        </View>
      </Content>
    </PopupLayout>)
  }
}

const styles = StyleSheet.create({
  container: {
    margin: '3%'
  },
  con: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 15
  },
  loginButton: {
    marginHorizontal: 10
  },
  p: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  headCon: {
    marginTop: 10,
    flexDirection: 'row'
  },
  headText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'left'
  }
})

RegisterScreen.propTypes = {
  registerLoading: PropTypes.bool,
  navigation: PropTypes.object,
  newUser: PropTypes.instanceOf(Map),

  submit: PropTypes.func,
  updateNewUser: PropTypes.func,
  handleFacebookLogin: PropTypes.func,
  handleGoogleLogin: PropTypes.func
}

RegisterScreen.defaultProps = {
  registerLoading: false,
  newUser: Map()
}

export default RegisterScreen
