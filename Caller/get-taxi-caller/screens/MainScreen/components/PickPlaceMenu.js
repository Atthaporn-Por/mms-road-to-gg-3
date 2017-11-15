import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { StyleSheet } from 'react-native'
import {
  Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,
  Form, Item, Input, Label
} from 'native-base'

export class PickPlaceMenu extends React.Component {
  render () {
    const { mainMap } = this.props
    const pickUp = mainMap.get('pickup')
    const dropOff = mainMap.get('dropOff')

    return (
      <Content style={this.props.style}>
        <Card>
          <CardItem cardBody>
            <Form>
              <Item inlineLabel>
                <Label>{ pickUp ? pickUp.get('name') : 'Pick Up' }</Label>
                <Input />
              </Item>
              <Item inlineLabel last>
                <Label>{ dropOff ? dropOff.get('name') : 'Drop Off' }</Label>
                <Input />
              </Item>
            </Form>
          </CardItem>
        </Card>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

PickPlaceMenu.propTypes = {
  style: PropTypes.number,
  mainMap: PropTypes.instanceOf(Map)
}

PickPlaceMenu.defaultProps = {
  mainMap: Map()
}

export default PickPlaceMenu
