import React from 'react'
import PropTypes from 'prop-types'
import { fromJS, Map } from 'immutable'

import { StyleSheet } from 'react-native'
import { Container, Content, Text, List, ListItem, Thumbnail, Icon, Body } from 'native-base'

const routes = [
  {
    name: 'Payment',
    navigate: 'PaymentScreen'
  }, {
    name: 'History',
    navigate: 'HistoryScreen'
  }, {
    name: 'Settings',
    navigate: 'SettingsScreen'
  }, {
    name: 'Logout',
    navigate: 'LogoutScreen'
  }
]

export class SideBar extends React.Component {
  render () {
    const { user } = this.props

    return (
      <Container>
        <Content>
          <Body style={styles.header}>
            <Thumbnail source={{ uri: user.get('image_url') }} />
            <Body style={styles.headerDetails}>
              <Text style={{ color: '#fff' }}>{user.get('full_name')}</Text>
              <Text note style={[styles.headerRating, { color: '#fff' }]}>
                {user.get('rating')}
                <Icon style={{ fontSize: 20, color: '#fff', marginLeft: 5 }} name='star' />
              </Text>
            </Body>
          </Body>
          <List>
            {
              routes.map(item => (
                <ListItem button key={item.name}
                  onPress={() => this.props.navigation.navigate(item.navigate)}>
                  <Text>{item.name}</Text>
                </ListItem>
              ))
            }
          </List>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    height: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: '6.5%'
  },
  headerDetails: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginHorizontal: '10%'
  },
  headerRating: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
})

SideBar.propTypes = {
  user: PropTypes.instanceOf(Map),
  navigation: PropTypes.object
}

SideBar.defaultProps = {
  user: fromJS({
    image_url: 'https://scontent.fbkk2-2.fna.fbcdn.net/v/t1.0-9/13502128_631267920353764_6789056590304521383_n.jpg?_nc_eui2=v1%3AAeFGep53kTXlgOLzQUo4klRkLVnQvH1FCr-gXAf45ODOB91bf_4BzRysq1_hU06K4WNUNcO8gRO2vL3wAav2OnDzHMJGl9iV8L3s7oN1QZTh-Q&oh=91250ff0c8aec7ce87cc5035f8e45735&oe=5AA2EE16',
    full_name: 'Thuchchai Jiamsorn',
    rating: '4.85'
  })
}

export default SideBar
