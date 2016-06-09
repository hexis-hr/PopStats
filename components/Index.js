/**
 * @providesModule Index
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import styles from './style.js';
import SelectCountry from './SelectCountry.js';

class Index extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Image source={require('../img/01.png')} style={styles.background}></Image>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={this.props.main._MyCountry}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Use my current country</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={function () {
              this.props.main.state.nav.push({view: SelectCountry, title: 'Select a country'});
            }.bind(this)}
            style={[styles.button, {backgroundColor: '#1C7CBD'}]}
          >
            <Text style={[styles.buttonText, {color: 'white'}]}>Manually select a country</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

module.exports = Index;
