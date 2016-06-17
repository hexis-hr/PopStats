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
  Image,
} from 'react-native';

import style from '../styles/style';

class NavigatorButton extends Component {

  constructor (props) {
    super(props);
  }

  renderTitle () {
    if (this.props.title) {
      return (
        <Text style={[style.mainNavBarButtonText, this.props.textStyle]}>
          {this.props.title}
        </Text>
      );
    }
  }

  renderLeftImage () {
    if (this.props.leftImage) {
      return (
        <Image
          source={this.props.leftImage}
        />
      );
    }
  }

  renderRightImage () {
    if (this.props.rightImage) {
      return (
        <Image
          source={this.props.rightImage}
        />
      );
    }
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={[style.mainNavBarButton, this.props.buttonStyle]}>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8}}
        >
          {this.renderLeftImage()}
          {this.renderTitle()}
          {this.renderRightImage()}
        </View>
      </TouchableHighlight>
    );
  }

}

module.exports = NavigatorButton;
