import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  Button,
  Icon,
  IconNB,
  Footer,
  FooterTab,
  Left,
  Right,
  Item,
  Input,
  Body
} from "native-base";
import { Constants } from 'expo';

export default class App extends Component {
  state = {
    inputValue: "You can change me!"
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };
 state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };
  render() {
    return (
      <View style={styles.container}>
     <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Image
          source={require("../assets/gettaxi_Head_logo.png" )}
          style={styles.logo}/>
          </Body>
          <Right />

        </Header>
        <View style:{styles.onMap>
           <MapView
          style={{ alignSelf: 'stretch', height: 500 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}/>
          <Header searchBar rounded>
            <Item>
              <Icon active name="search" />
              <Input placeholder="Search" />
              <Icon active name="timesCircle" />
            </Item>
            <Button transparent>
              <Text>ต้นทาง</Text>
            </Button>
          </Header>
          <Header searchBar rounded>
            <Item>
              <Icon active name="search" />
              <Input placeholder="Search" />
              <Icon active name="timesCircle" />
            </Item>
            <Button transparent>
              <Text>ปลายทาง</Text>


            </Button>
          </Header>
        </View>
        <Image
          source={require("../assets/Call.png" )}
          style={styles.button1}/>
        <Image
          source={require("../assets/booking.png" )}
          style={styles.bitton1}/>  
        <Content padder>
        <Item rounded>
          <View style:{styles.information}>
             <Text style:{styles.infoDataLeft}>90 ฿</Text>
             <Text styles:{styles.infoDataCenter}>
              <Icon active name="plusCircle" />
              Add Condition
              </Text>
             <Text style:{styles.infoDataRight}>
              Book Now
             </Text>
          </View>
          <View styles:{styles.information}>
            <Text style:{styles.infoDataLeft}>เงินสด</Text>
             <Text styles:{styles.infoDataCenter}>
              <Icon active name="paw" />
               Pet
              </Text>
             <Text style:{styles.infoDataRight}>
               9.00 AM
             </Text>
          </View>
        </Item>
      </Content>
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
  },
  logo:{
    logo:{
    marginTop: 0,
    width: "40%",
    height: "15%",
    resizeMode: 'contain'
  },
  onMap:{
    marginTop:"20%"

  },
  button1:{
    marginBottom :"7%"

  },
  information:{
    height:10,
    width :"70%"
  },
  infoDataLeft:{
    textAlign: 'Left',
    fontSize: 10,
    ontWeight: 'bold',
    color: '#34495e'
  },
  infoDataCenter:{
    textAlign: 'center',
    fontSize: 10,
    ontWeight: 'bold',
    color: '#34495e'
  },
  infoDataRight:{
    textAlign: 'Right',
    fontSize: 10,
    ontWeight: 'bold',
    color: '#34495e'
  }
});
