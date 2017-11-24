import React from 'react'
import { List, fromJS } from 'immutable'
import PropTypes from 'prop-types'

import { Image, StyleSheet, View } from 'react-native'
import {
  Left, Body, Right, Content,
  Text, Card, CardItem, Button
} from 'native-base'

import Icon from 'react-native-vector-icons/FontAwesome'
import PopupLayout from 'layouts/PopupLayout'

export class AddWalletScreen extends React.Component {
  getListCards () {
    return this.props.cards.map(item => (
      <Card style={styles.card} key={item.get('id')}>
        <CardItem style={styles.cardDescription}>
          <Left style={styles.leftDescription}>
            <Icon name='credit-card' size={20} color='rgb(82, 108, 221)' />
          </Left>
          <Body style={styles.bodyDescription}>
            <Text >{item.get('card_name')}</Text>
            <Text >{item.get('card_id')}</Text>
          </Body>
        </CardItem>
      </Card>
    ))
  }

  render () {
    return (
      <PopupLayout title='Cards' onPressBack={() => this.props.navigation.goBack(null)}>
        <Content>
          <View style={styles.container_card}>
            {this.getListCards()}
          </View>
          <Button style={styles.button}>
            <Icon name='plus-circle' size={20} color='rgb(82, 108, 221)' />
            <Text style={styles.button_text}>Add New Cards</Text>
          </Button>
        </Content>
      </PopupLayout>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex:1
  },
  leftDescription: {
    flex: 1,
    flexDirection: 'column'
  },
  bodyDescription: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  cardDescription: {
    backgroundColor: '#fff'
  },
  button: {
    marginVertical: 20,
    marginHorizontal:30,
    borderWidth: 2,
    borderColor: 'rgb(82, 108, 221)',
    backgroundColor: '#fff',
    alignSelf:'stretch',
    justifyContent:'center'
  },
  container_card:{
    marginHorizontal:30,
    marginTop:20
  },
  button_text:{
    color:'rgb(82, 108, 221)'
  }

})

AddWalletScreen.propTypes = {
  cards: PropTypes.instanceOf(List),
  navigation: PropTypes.object
}

AddWalletScreen.defaultProps = {
  cards: fromJS([{ // For Mock only *******
    id:0,
    card_name:'Thuchchai Jiamsorn',
    card_id:'452-654-4457'
  },
  {
    id:1,
    card_name:'Weeraphat Weeraphat',
    card_id:'444-654-4457'
  }])
}

export default AddWalletScreen
