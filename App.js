import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { auto } from 'async';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  
  donationAmount = ''
  formattedString = ''
  place = 'Free the Footlong'
  subway = {
    latitude: 37.7247506,
    longitude: -122.4819726
  }

  onChanged(text) { 
    localText = text
    if (localText) {
      //formattedString = this.formatToDollars(localText)
      //this.setState({number: this.formatToDollars(localText)})
    }
    this.setState({number: localText})
    this.donationAmount = localText
  }

  removeFromDollars(text) {
    //localText = text
    if (text) {
      text.replace(/\D/g,'')
    }
  }

  formatToDollars(text) {
    localText = text
    this.removeFromDollars(localText)
    if (localText.length > 2) {
      return '$' + localText.substring(0, localText.length - 2) + '.' + localText.substring(-2)
    } else if (!text) {
      Alert.alert(None)
    } else {
      return '$' + localText
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{this.place}</Text>
        </View>
        <MapView
        style={styles.map}
        region={{
          latitude: 37.7258863,
          longitude: -122.4826824,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0121
        }}
        showsUserLocation={true}
        >
        <Marker
          title = 'Subway'
          coordinate={this.subway}
        >

        </Marker>
        </MapView>
      
        <View style={styles.container}>
          <View style={styles.donationSection}>
            <Text style={styles.donationInner}>Donate to {this.place}</Text>
          </View>
          <TextInput 
            style={styles.donationInput}
            placeholder='Enter amount here!'
            keyboardType = 'numeric'
            onChangeText = {(text)=> this.onChanged(text)}
            value = {this.state.number}
            placeholderTextColor = '#03DAC5'
            color = '#fff'
            //enablesReturnKeyAutomatically={true}
            returnKeyType='done'
          />
          <View style={styles.buttonSection}>
            <Button 
            onPress = {() => {
              Alert.alert('You have donated $' + this.donationAmount + ' to ' + this.place + '!')
            }}
            title='Donate'
            color='#fff'
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#3700A0',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '1%',
  },
  headerText: {
    fontSize: 30,
    color: '#fff'
  },
  map: {
    flex: 6,
  },
  container: {
    flex: 2,
    backgroundColor: '#3700A0',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  donationSection: {
    backgroundColor: '#6200EE',
    width: '100%',
    alignItems: 'center',
    marginBottom: '3%',
    paddingTop: '2%',
    paddingBottom: '2%'
  },
  donationInner: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  donationInput: {
    fontSize: 20,
  },
  buttonSection: {
    backgroundColor: '#03DAC5',
    borderRadius: 50,
    width: '25%',
    marginTop: '3%',
  }
});
