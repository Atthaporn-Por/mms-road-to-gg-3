import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import {
  Container, Header, Content, Footer, Left, Body, Title,
  Text, Button, Icon
} from 'native-base'

import Layout from './components/Layout'
import MainMap from './components/MainMap'
import PickPlaceMenu from './components/PickPlaceMenu'

export class MainScreen extends React.Component {
  render () {
    return (
      <Layout onPressMenu={() => this.props.navigation.navigate('DrawerOpen')}>
        <MainMap {...this.props}>
          {/* <View style={styles.overLayPanel}> */}
            <PickPlaceMenu style={styles.pickPlaceMenu} navigation={this.props.navigation} />
          {/* </View> */}
        </MainMap>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  overLayPanel: {
    flex: 1
  },
  pickPlaceMenu: {

  }
})

MainScreen.propTypes = {
  navigation: PropTypes.object
}

export default MainScreen
