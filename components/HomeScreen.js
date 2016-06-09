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
} from 'react-native';

import style from '../styles/style';
import CountryListScreen from './CountryListScreen';

var flex = 1;

class HomeScreen extends Component {

  constructor (props) {
    super(props);
  }

  manuallySelectCountry () {
    this.props.nav.push({component: CountryListScreen, title: 'Select country you wish to view'});
  }

  render() {
    return (
      <View style={style.mainContainer}>
        <View style={{flex}}></View>
        <View>
          <View style={style.titleContainer}>
            <Text style={style.titleText}>Would you like to view statistics</Text>
            <Text style={style.titleText}>for your current country?</Text>
          </View>
          <TouchableHighlight style={style.whiteButton}>
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
