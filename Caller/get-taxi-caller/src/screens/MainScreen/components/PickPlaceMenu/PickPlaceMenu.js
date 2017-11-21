import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { StyleSheet } from 'react-native'

import {
  Container, Content, Button, Form, Item, Input, Label
} from 'native-base'

export class PickPlaceMenu extends React.Component {
  render () {
    const { newTransaction, navigation } = this.props
    const pickUp = newTransaction.get('pick_up')
    const dropOff = newTransaction.get('drop_off')

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
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ]),
  navigation: PropTypes.object,
  newTransaction: PropTypes.instanceOf(Map)
}

PickPlaceMenu.defaultProps = {
  mainMap: Map()
}

export default PickPlaceMenu
