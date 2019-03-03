import React from 'react';
import Communications from 'react-native-communications';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { auto } from 'async';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  
  donationAmount = ''
  formattedString = ''
  place = 'End Evil'
  donateText = <View style={styles.buttonMap}>
                  <Button
                    title='Find Nearest Evil'
                    onPress = {()=>{
                      this.setMyMarker()
                    }}
                    color='#fff'
                    />
                </View>
  subway = {
    latitude: 37.723160, 
    longitude: -122.482245
  }

  sendRandomSMS() {
    FTF = '6504369848'
    Communications.text(FTF, 'Give $' + this.donationAmount + ' to Free the Footlong')
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

  myMarker = <Text></Text>

  setMyMarker() {
    this.myMarker = <Marker
      title = 'Subway'
      description = {`Free the Footlong`}
      coordinate={this.subway}
    />
    this.place = 'Free the Footlong'
    this.donateText = <Text style={styles.donationInner}>Donate to Free the Footlong</Text>
    Alert.alert(`You are near a Subway. Although beloved by hungry people everywhere, Subway has a long history of abusing young submarine sandwiches. Free The Footlong (FTF) is a charitable organization that was founded in 1899 with a singular goal: improve the welfare of footlong sandwiches everywhere. Since then, FTF has expanded its mandate to protecting sandwiches of all sizes, colors, national origins, and ages. Your donation will go to the Footlong Forever Fund, which FTF uses to free helpless sandwiches from persecution.
    `)
    this.forceUpdate()
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
        {this.myMarker}
        </MapView>
      
        <View style={styles.container}>
          <View style={styles.donationSection}>
            {this.donateText}
          </View>
          <TextInput 
            style={styles.donationInput}
            placeholder='Enter donation amount here!'
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
              this.sendRandomSMS()
              Alert.alert('You have donated' + this.donationAmount + ' to ' + this.place + '!')
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
    fontWeight: 'bold',
    color: '#fff'
  },
  map: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2%'
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
  buttonMap: {
    width: '60%',
    borderRadius: 30,
    backgroundColor: '#03DAC5',
  },
  buttonSection: {
    backgroundColor: '#03DAC5',
    borderRadius: 50,
    width: '25%',
    marginTop: '3%',
  }
});
