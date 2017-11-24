import React from 'react'
import { List, fromJS } from 'immutable'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  TextInput,
  Text
} from 'react-native'
import { Content, Thumbnail } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

import MainScreenLayout from 'layouts/MainScreenLayout'

export class EditProfileScreen extends React.Component {
  render () {
    const { user } = this.props
    return (
      <MainScreenLayout>
        <View style={styles.container}>
          <View style={styles.header_container}>
            <Thumbnail style={styles.avatar} source={{ uri: user.get('image_url') }} />
            <Text style={styles.header_text}>{user.get('full_name')}</Text>
          </View>
          <View style={styles.editForm_container}>
            <Text style={styles.body_text}>Full name</Text>
            <TextInput
              style={styles.textInput}
              placeholder={user.get('full_name')}
              underlineColorAndoid={'transparent'}
            />
            <Text style={styles.body_text}>E-mail</Text>
            <TextInput
              style={styles.textInput}
              placeholder='E-mail'
              underlineColorAndoid={'transparent'}
            />
            <Text style={styles.body_text}>Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Password'
              underlineColorAndoid={'transparent'}
            />
            <Text style={styles.body_text}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Phone Number'
              underlineColorAndoid={'transparent'}
            />
            <View style={styles.button_container}>
              <Icon.Button
                name='facebook'
                style={styles.button_fb}
                iconStyle={styles.fbIcon}
              >
                <Text style={[styles.button_text, styles.fbIcon]}>Logout from Facebook</Text>
              </Icon.Button>
              <Icon.Button
                name='google'
                style={styles.button_gg}
                iconStyle={styles.googleIcon}
              >
                <Text style={[styles.button_text, styles.googleIcon]}>Login with Google</Text>
              </Icon.Button>
            </View>
          </View>
        </View>
      </MainScreenLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  header_container: {
    flex: 0.8,
    backgroundColor: 'rgb(224, 224, 224)',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  editForm_container: {
    flex: 3,
    backgroundColor: 'rgb(255, 255, 255)',
    flexDirection: 'column',
    paddingHorizontal: 40,
    paddingVertical: 20,
    justifyContent: 'flex-start'
  },
  avatar: {
    alignSelf: 'center',
    borderRadius: 100,
    width: 60,
    height: 60
  },
  header_text: {
    marginTop: 10,
    fontSize: 16,
    color: 'rgb(53, 62, 125)',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  body_text: {
    fontSize: 15,
    color: 'rgb(53, 62, 125)'
  },
  textInput: {
    height: 40,
    color: '#000',
    borderBottomColor: 'rgb(78, 96, 158)'
  },
  button_container: {
    flex: 0.7,
    justifyContent: 'space-around',
    flexDirection: 'column',
    marginVertical: 20
  },
  button_fb: {
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#3B5998',
    backgroundColor: '#fff'
  },
  button_gg: {
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#DD4B35',
    backgroundColor: '#fff'
  },
  fbIcon: {
    color: '#3b5998'
  },
  googleIcon: {
    color: '#DD4B35'
  },
  button_text: {
    fontSize: 15,
    flex: 1,
    textAlign: 'center'
  }
})

EditProfileScreen.defaultProps = {
  user: fromJS({
    image_url:
      'https://scontent.fbkk2-2.fna.fbcdn.net/v/t1.0-9/13502128_631267920353764_6789056590304521383_n.jpg?_nc_eui2=v1%3AAeFGep53kTXlgOLzQUo4klRkLVnQvH1FCr-gXAf45ODOB91bf_4BzRysq1_hU06K4WNUNcO8gRO2vL3wAav2OnDzHMJGl9iV8L3s7oN1QZTh-Q&oh=91250ff0c8aec7ce87cc5035f8e45735&oe=5AA2EE16',
    full_name: 'Thuchchai Jiamsorn'
  })
}

// EditProfileScreen.propTypes = {
//
// }
//

export default EditProfileScreen
