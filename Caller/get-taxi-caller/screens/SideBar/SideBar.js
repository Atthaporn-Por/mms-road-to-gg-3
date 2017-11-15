import React from 'react'
import PropTypes from 'prop-types'
import { fromJS, Map } from 'immutable'

import { StyleSheet } from 'react-native'
import { Container, Content, Text, List, ListItem, Thumbnail, Icon } from 'native-base'

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
  }
]

export class SideBar extends React.Component {
  render () {
    const { user } = this.props

    return (
      <Container>
        <Content>
          <Content contentContainerStyle={styles.header}>
            <Thumbnail source={{ uri: user.get('image_url') }} />
            <Content contentContainerStyle={styles.headerDetails}>
              <Text>{user.get('full_name')}</Text>
              <Text note style={styles.headerRating}>
                {user.get('rating')}
                <Icon name='star' />
              </Text>
            </Content>
          </Content>
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
    height: 200,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  headerDetails: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  headerRating: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})

SideBar.propTypes = {
  user: PropTypes.instanceOf(Map),
  navigation: PropTypes.object
}

SideBar.defaultProps = {
  user: fromJS({
    image_url: 'https://lh3.google.com/u/0/d/1UcTVCODVGJjqmsxqM0TmK1-0iTMvl3DQ=w1920-h949-iv1'
  })
}

export default SideBar
