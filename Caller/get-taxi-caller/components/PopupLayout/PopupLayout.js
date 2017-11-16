import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import {
  Container, Header, Content, Footer, Left, Body, Right, Title,
  Text, Button, Icon
} from 'native-base'

export class PopupLayout extends React.Component {
  render () {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.onPressBack()}>
              <Icon name='close' />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {this.props.children}
        </Content>
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

PopupLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,

  onPressBack: PropTypes.func
}

export default PopupLayout
