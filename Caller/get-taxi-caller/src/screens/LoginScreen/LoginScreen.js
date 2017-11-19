import React from 'react'
import { List, fromJS } from 'immutable'
import PropTypes from 'prop-types'

import { Image, StyleSheet, View } from 'react-native'
import {
  Left, Body, Right, Content, Label, Item,
  Text, Button, InputGroup, Input
} from 'native-base'
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
          <Button primary style={styles.p} ><Text> Log-in </Text></Button>
        </Content>
      </MainScreenLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: '2.5%'
  },
  button: {
    width: '100px',
    height: '100px'
  },
  p: {
    marginLeft: '30%',
    marginRight: '30%'
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
