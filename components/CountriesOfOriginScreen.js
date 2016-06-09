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
import YearNavigator from './YearNavigator';
import CountriesOfOrigin from './CountriesOfOrigin';

var flex = 1;

class CountriesOfOriginScreen extends Component {

  constructor (props) {
    super(props);
  }

  renderScene (route, nav) {
    return (
      <CountriesOfOrigin
        route={this.props.route}
        nav={this.props.nav}
        nestedRoute={route}
        nestedNav={nav}
        root={this.props.root}
      />
    );
  }

  render() {
    return (
      <View style={[style.mainContainer, style.mainContainerWithNavigationBar, style.lightBackground]}>
        <YearNavigator
          initialRoute={{year: this.props.root.state.year}}
          renderScene={this.renderScene.bind(this)}
          root={this.props.root}
        />
      </View>
    );
  }

}

module.exports = CountriesOfOriginScreen;
