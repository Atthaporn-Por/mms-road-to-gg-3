import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { StyleSheet, View } from 'react-native'
import {
  Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,
  Header, Form, Item, Input, Label
} from 'native-base'

export class PickPlaceMenu extends React.Component {
  render () {
    const { mainMap, navigation } = this.props
    const pickUp = mainMap.get('pick_up')
    const dropOff = mainMap.get('drop_off')
    console.log(mainMap, pickUp);

    return (
      <Container style={[styles.container, this.props.style]}>
        <Content scrollEnabled={false}>
          <Form>
            <Item inlineLabel first>
              <Button transparent onPress={() => navigation.navigate('ChoosePickUpScreen')}>
                <Label>{ pickUp.size ? pickUp.get('name') : 'Pick Up' }</Label>
                <Input disabled />
              </Button>
            </Item>
            <Item inlineLabel last>
              <Button transparent onPress={() => navigation.navigate('ChooseDropOffScreen')}>
                <Label>{ dropOff.size ? dropOff.get('name') : 'Drop Off' }</Label>
                <Input disabled />
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
})

PickPlaceMenu.propTypes = {
  style: PropTypes.number,
  navigation: PropTypes.object,
  mainMap: PropTypes.instanceOf(Map)
}

PickPlaceMenu.defaultProps = {
  mainMap: Map()
}

export default PickPlaceMenu
