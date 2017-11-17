import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';

import { Constants } from 'expo';

export default class App extends Component {
  state = {
    inputValue: "You can change me!"
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <View style={styles.container}>
      <Text>
        'Hi'
      </Text>
        <TextInput
          value={this.state.inputValue}
          onChangeText={this._handleTextChange}
          style={{ width: 200, height: 44, padding: 8 }}
        />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  }
});
