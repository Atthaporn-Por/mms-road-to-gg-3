import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import {
  Container, Header, Content, Footer, Left, Body, Title,
  Text, Button, Icon
} from 'native-base'

import Layout from './components/Layout'
import Map from './components/Map'

export class MainScreen extends React.Component {
  render () {
    return (
      <Layout onPressMenu={() => this.props.navigation.navigate('DrawerOpen')}>
        <Map />
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

MainScreen.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,

  onPressMenu: PropTypes.func
}

export default MainScreen
