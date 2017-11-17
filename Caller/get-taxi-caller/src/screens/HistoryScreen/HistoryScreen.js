import React from 'react'
import { List, fromJS } from 'immutable'
import PropTypes from 'prop-types'

import { Image, StyleSheet, View } from 'react-native'
import {
  Left, Body, Right, Content,
  Text, Card, CardItem, Button, Icon
} from 'native-base'

import PopupLayout from 'layouts/PopupLayout'

export class HistoryScreen extends React.Component {
  getHistoryCards () {
    return this.props.history.map(item => (
      <Card style={styles.card} key={item.get('id')}>
        <CardItem cardBody>
          <Image style={styles.map_image} source={{ uri: item.get('map_url') }} />
        </CardItem>
        <CardItem style={styles.cardDescription}>
          <Left style={styles.leftDescription}>
            <Text style={styles.leftDescription}>{item.get('date')}</Text>
            <Text style={styles.leftDescription} note>{item.get('driver').get('car_model')}</Text>
          </Left>
          <Right style={styles.rightDescription}>
            <Text>{item.get('cost')}</Text>
            {
              item.get('state') === 'canceled'
                ? <Text note>Canceled</Text>
                : <Text />
            }
          </Right>
        </CardItem>
      </Card>
    ))
  }

  render () {
    return (
      <PopupLayout title='Travel History' onPressBack={() => this.props.navigation.goBack(null)}>
        <Content>
          {this.getHistoryCards()}
        </Content>
      </PopupLayout>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fafafa',
    flex: 1,
    flexDirection: 'column'
  },
  card: {
    marginTop: 10
  },
  leftDescription: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-start'
  },
  rightDescription: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-end',
    justifyContent: 'flex-start'
  },
  cardDescription: {
    backgroundColor: '#fff'
  },
  map_image: {
    flex: 1,
    width: null,
    height: 200
  }
})

HistoryScreen.propTypes = {
  history: PropTypes.instanceOf(List),
  navigation: PropTypes.object
}

HistoryScreen.defaultProps = {
  history: fromJS([{ // For Mock only *******
    id: 0,
    cost: '฿25.58',
    date: '11/13/17, 10:57 PM',
    driver: {
      name: 'Thuchchai Jiamsorn',
      car_model: 'Toyota Yaris',
      license_plate: 'กข-5731'
    },
    state: 'finish',
    map_url: 'https://www.mx7.com/i/27b/Nlde1S.jpg'
  }, {
    id: 1,
    cost: '฿90.10',
    date: '11/09/17, 09:10 AM',
    driver: {
      name: 'Thuchchai Jiamsorn',
      car_model: 'Toyota Yaris',
      license_plate: 'กข-5731'
    },
    state: 'canceled',
    map_url: 'https://www.mx7.com/i/27b/Nlde1S.jpg'
  }])
}

export default HistoryScreen
