/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import style from '../styles/style';

class NavigatorButton extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={[style.mainNavBarButton, this.props.buttonStyle]}>
        <View>
          <Text style={[style.mainNavBarButtonText, this.props.textStyle]}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

}

module.exports = NavigatorButton;
