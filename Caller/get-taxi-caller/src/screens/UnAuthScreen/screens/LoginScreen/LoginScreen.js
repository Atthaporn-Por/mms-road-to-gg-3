import React from 'react'
import { Map } from 'immutable'
import PropTypes from 'prop-types'

import { StyleSheet, View } from 'react-native'
import {
  Content,
  Form,
  Item,
  Text,
  Button,
  Input
} from 'native-base'

import PopupLayout from 'layouts/PopupLayout'
import OAuthPanel from '../../components/OAuthPanel'

export class LoginScreen extends React.Component {
  render () {
    return (
      <PopupLayout title='Login' onPressBack={() => this.props.navigation.goBack()}>
        <Content padder style={styles.container}>
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
          <Form>
            <Item rounded style={styles.container}>
              <Input placeholder='Username'
                value={this.props.userLogingin.get('user')}
                onChangeText={text => this.props.updateUserLogingin({ user: text })}
              />
            </Item>
            <Item rounded style={styles.container}>
              <Input placeholder='Password' secureTextEntry
                value={this.props.userLogingin.get('user')}
                onChangeText={text => this.props.updateUserLogingin({ password: text })}
              />
            </Item>
            <Button primary full large
              disabled={this.props.signInLoading}
              onPress={this.props.login}
              style={{ marginVertical: 20 }}>
              <Text style={styles.loginText}>
                Login
              </Text>
            </Button>
          </Form>
        </Content>
      </PopupLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: '2.5%'
  },
  loginBtnCon: {
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    marginBottom: 10
  },
  con: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  btnCon: {
    marginHorizontal: 10
  },
  oAuthBtn: {
    height: null,
    marginHorizontal: 20
  },
  icon: {
    fontSize: 80
  },
  fbIcon: {
    color: '#3b5998'
  },
  googleIcon: {
    color: '#DD4B35'
  },
  p: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  loginText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 23,
    lineHeight: 40
  }
})

LoginScreen.propTypes = {
  signInLoading: PropTypes.bool,
  navigation: PropTypes.object,
  userLogingin: PropTypes.instanceOf(Map),

  updateUserLogingin: PropTypes.func,
  login: PropTypes.func,
  handleGoogleLogin: PropTypes.func,
  handleFacebookLogin: PropTypes.func
}

LoginScreen.defaultProps = {
  userLogingin: Map()
}

export default LoginScreen
