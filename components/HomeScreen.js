/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

import style from '../styles/style';
import CountryListScreen from './CountryListScreen';
import fetcher from '../library/fetcher';

var flex = 1;

class HomeScreen extends Component {

  constructor (props) {
    super(props);
  }

  manuallySelectCountry () {
    this.props.nav.push({component: CountryListScreen, title: 'Select country you wish to view'});
  }

  detectCountry () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetcher.getUserCountry(position.coords.latitude, position.coords.longitude).then((location) => {
          console.log(location);
        }).done();
      },
      (error) => console.log(error),
      {timeout: 20000}
    );
  }

  render() {
    return (
      <View style={style.mainContainer}>
        <View style={{flex, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../img/home-logo.png')}
          />
        </View>
        <View>
          <View style={style.titleContainer}>
            <Text style={style.titleText}>Would you like to view statistics</Text>
            <Text style={style.titleText}>for your current country?</Text>
          </View>
          <TouchableHighlight onPress={this.detectCountry.bind(this)} style={style.whiteButton}>
            <View><Text style={style.whiteButtonText}>Use my current country</Text></View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.manuallySelectCountry.bind(this)} style={style.blueButton}>
            <View><Text style={style.blueButtonText}>Manually select country</Text></View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

module.exports = HomeScreen;
