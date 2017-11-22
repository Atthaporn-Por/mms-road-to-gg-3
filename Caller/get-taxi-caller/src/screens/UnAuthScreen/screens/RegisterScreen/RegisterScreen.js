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

export class RegisterScreen extends React.Component {
  render () {
    return (<PopupLayout title='Login' onPressBack={() => this.props.navigation.goBack()}>
      <Content style={styles.container}>
        <View style={styles.headCon}>
          <Text style={styles.headText}>
            Register With
          </Text>
        </View>
        <View style={styles.con}>
          <Button transparent style={styles.loginButton} onPress={this._handleFacebookLogin}>
            <Icon name='facebook-official' style={styles.fbIcon} />
          </Button>
          <Button transparent style={styles.loginButton} onPress={this._handleGoogleLogin}>
            <Icon name='google-plus-official' style={styles.googleIcon} />
          </Button>
        </View>
        <Item rounded style={styles.container}>
          <Input placeholder='Username' />
        </Item>
        <Item rounded style={styles.container}>
          <Input placeholder='Email' />
        </Item>
        <Item rounded style={styles.container}>
          <Input placeholder='Password' secureTextEntry />
        </Item>
        <Item rounded style={styles.container}>
          <Input placeholder='Phone Number' />
        </Item>
        <View style={styles.con}>
          <Button primary style={styles.loginButton}>
            <Text>
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
  isRegisterLoading: PropTypes.bool,
  navigation: PropTypes.object,
  newUser: PropTypes.instanceOf(Map)
}

RegisterScreen.defaultProps = {
  isRegisterLoading: false,
  newUser: Map()
}

export default RegisterScreen
