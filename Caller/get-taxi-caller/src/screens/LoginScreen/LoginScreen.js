import React from 'react'
import { List, fromJS } from 'immutable'
import PropTypes from 'prop-types'

import { Image, StyleSheet, View } from 'react-native'
import {
  Left, Body, Right, Content, Label, Item,
  Text, Button, InputGroup, Input
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Col, Row, Grid } from 'react-native-easy-grid'

import MainScreenLayout from 'layouts/MainScreenLayout'

export class LoginScreen extends React.Component {
  render () {
    return (
      <MainScreenLayout >
        <Content style={styles.container}>
          <Item rounded style={styles.container}>
            <Input placeholder='Username' />
          </Item>
          <Item rounded style={styles.container}>
            <Input placeholder='Password' secureTextEntry={true} />
          </Item>
          <View style={styles.con}>
            <Button primary style={styles.loginButton}><Text> Log-in </Text></Button>
            <Button transparent style={styles.loginButton}>
              <Icon name='facebook-official'
                style={styles.fbIcon} />
            </Button>
          </View>
        </Content>
      </MainScreenLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: '2.5%'
  },
  con: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  loginButton: {
    marginHorizontal: 10
  },
  fbIcon: {
    fontSize: 50,
    color: '#3b5998'
  },
  p: {
    alignItems: 'center',
    flexDirection: 'column'
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
export default LoginScreen
