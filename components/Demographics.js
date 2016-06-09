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
  ListView,
  TouchableHighlight,
} from 'react-native';

import style from '../styles/style';
import fetcher from '../library/fetcher';
import helper from '../library/helper';
import YearNavigator from './YearNavigator';

var flex = 1;

class Demographics extends Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  render() {
    if (true) { return this.props.root.renderLoader(); }
    return (
      <View></View>
    );
  }

}

module.exports = Demographics;
