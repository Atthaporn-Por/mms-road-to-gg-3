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
import Icon from 'react-native-vector-icons/FontAwesome'

import MainScreenLayout from 'layouts/MainScreenLayout'

export class LoginScreen extends React.Component {
  render () {
    return (
      <MainScreenLayout >
        <Content style={styles.container}>
          <View style={[styles.loginBtnCon, styles.con]}>
            <Button transparent style={styles.oAuthBtn} onPress={this.props.handleFacebookLogin}>
              <Icon name='facebook-official' style={[styles.fbIcon, styles.icon]} />
            </Button>
            <Button transparent style={styles.oAuthBtn} onPress={this.props.handleGoogleLogin}>
              <Icon name='google-plus-official' style={[styles.googleIcon, styles.icon]} />
            </Button>
          </View>
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
            <View style={styles.con}>
              <Button primary onPress={this.props.login} style={{ height: 50 }} disabled={this.props.signInLoading}>
                <Text style={styles.loginText}>
                  Log-in
                </Text>
              </Button>
            </View>
          </Form>
        </Content>
      </MainScreenLayout>
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
