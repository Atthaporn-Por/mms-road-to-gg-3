import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import {
  Container, Header, Content, Footer, Left, Body, Title,
  Text, Button, Icon
} from 'native-base'

export class MainScreen extends React.Component {
  render () {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.onPressMenu()}>
              <Icon name='menu' />
            </Button>
          </Left>
        </Header>
        <View style={{ flex: 1 }}>
          {this.props.children}
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

MainScreen.propTypes = {
  children: PropTypes.node,

  onPressMenu: PropTypes.func
}

export default MainScreen
