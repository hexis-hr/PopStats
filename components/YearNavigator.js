import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Navigator,
  ListView,
} from 'react-native';

import style from '../styles/style';
import NavigatorButton from './NavigatorButton';

var flex = 1;

class YearNavigator extends Component {

  constructor (props) {
    super(props);

    var MIN_YEAR = 1951;
    var LeftButtonPress = (nav) => {
      nav.replace({year: --this.props.root.state.year});
    };
    var RightButtonPress = (nav) => {
      nav.replace({year: ++this.props.root.state.year});
    };

    var LeftButton = (route, nav, index, navState) => {
      if (this.props.root.state.year > MIN_YEAR) {
        return (
          <NavigatorButton
            textStyle={style.nestedNavButtonText}
            buttonStyle={style.nestedNavButton}
            title={'<'}
            onPress={() => LeftButtonPress(nav)}
          />
        );
      }
    };

    var RightButton = (route, nav, index, navState) => {
      if (this.props.root.state.year < (new Date()).getFullYear()) {
        return (
          <NavigatorButton
            textStyle={style.nestedNavButtonText}
            buttonStyle={style.nestedNavButton}
            title={'>'}
            onPress={() => { RightButtonPress(nav); }}
          />
        );
      }
    };

    var Title = (route, nav, index, navState) => {
      return (
        <View style={{flex, justifyContent: 'center'}}>
          <Text style={style.nestedNavTitleText}>{route.year}</Text>
        </View>
      );
    };

    this.navigationBar = {LeftButton, RightButton, Title};

  }

  renderNavigationBar () {
    return (<Navigator.NavigationBar routeMapper={this.navigationBar} style={style.nestedNavBar}/>);
  }

  render() {
    return (
      <Navigator
        style={{flex}}
        initialRoute={this.props.initialRoute}
        renderScene={this.props.renderScene}
        navigationBar={this.renderNavigationBar()}
      />
    );
  }

}

module.exports = YearNavigator;
