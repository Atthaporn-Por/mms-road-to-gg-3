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
        <MainMap {...this.props} styles={styles.mainMap} />
        <View style={styles.overLayPanel}>
          <PickPlaceMenu style={styles.pickPlaceMenu} navigation={this.props.navigation} />
        </View>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  mainMap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0
  },
  overLayPanel: {
    position: 'absolute',
    top: 0,
    bottom: null,
    left: 0,
    right: 0,
    zIndex: 1
  },
  pickPlaceMenu: {
    height: null,
    marginTop: '5%',
    marginHorizontal: '5%'
  }
})

MainScreen.propTypes = {
  navigation: PropTypes.object
}

export default MainScreen
