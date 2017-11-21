import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import {
  Container, Header, Content, Footer, Left, Body, Title,
  Text, Button, Icon
} from 'native-base'

import Layout from 'layouts/MainScreenLayout'
// import Layout from 'components/PopupLayout'
import MainMap from './components/MainMap'
import PickPlaceMenu from './components/PickPlaceMenu'
import CallButtonsPanel from './components/CallButtonsPanel'

export class MainScreen extends React.Component {
  render () {
    return (
      <Layout onPressMenu={() => this.props.navigation.navigate('DrawerOpen')}>
        <MainMap {...this.props} styles={styles.mainMap} />
        <PickPlaceMenu style={[styles.overLayPanel, styles.pickPlaceMenu]} navigation={this.props.navigation} />
        <CallButtonsPanel style={[styles.overLayPanel, styles.callButtonsPanel]} navigation={this.props.navigation} />
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
    zIndex: 1
  },
  pickPlaceMenu: {
    top: 0,
    left: 0,
    right: 0,
    bottom: null,
    height: null,
    marginTop: '5%',
    marginHorizontal: '5%'
  },
  callButtonsPanel: {
    top: null,
    bottom: 0,
    height: null,
    marginBottom: '5%'
  }
})

MainScreen.propTypes = {
  navigation: PropTypes.object
}

export default MainScreen
