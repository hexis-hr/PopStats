import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import style from '../styles/style';
import helper from '../library/helper';

class Warning extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        backgroundColor: '#FCF8E3',
        borderWidth: 1,
        borderColor: '#FAEBCC',
        padding: 4,
        marginHorizontal: 8,
        marginBottom: 4,
      }}>
        <Text style={{color: '#8a6d3b', fontSize: 12}}>{this.props.warning}</Text>
      </View>
    );
  }

}

module.exports = Warning;
