/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Navigator,
  StatusBar,
  Image,
} from 'react-native';

import style from './styles/style';
import Loader from './components/Loader';
import HomeScreen from './components/HomeScreen';
import NavigatorButton from './components/NavigatorButton';

var flex = 1;
const DEFAULT_YEAR = 2014;

class PopStats extends Component {

  constructor (props) {
    super(props);

    this.state = {
      year: DEFAULT_YEAR,
    };

    var LeftButtonPress = (nav) => { nav.pop(); };
    var RightButtonPress = (nav, index) => { nav.push({title: null, text: 'New page'}); };

    var LeftButton = (route, nav, index, navState) => {
      if (index > 0) {
        return (
          <NavigatorButton
            onPress={() => LeftButtonPress(nav)}
            leftImage={require('./img/navigation/backArrow.png')}
          />
        );
      }
    };

    var RightButton = (route, nav, index, navState) => {
      return null;
      if (index > 0) { return (<NavigatorButton onPress={() => RightButtonPress(nav, index)} title={'>'}/>); }
    };

    var Title = (route, nav, index, navState) => {
      if (index > 0) {
        return (
          <View style={style.mainNavBarButton}>
            <Text style={style.mainNavBarTitleText}>{route.title ? route.title : ''}</Text>
          </View>
        );
      }
    };

    this.navigationBar = {LeftButton, RightButton, Title};
  }

  mainNavRenderScene (route, nav) {
    return React.createElement(route.component, {route, nav, root: this});
  }

  navigationBarRender () {
    return (<Navigator.NavigationBar routeMapper={this.navigationBar} style={style.mainNavBar}/>);
  }

  renderLoader () {
    return (
      <View style={style.mainNavBarButton}>
        <Loader color='#0072BC' />
      </View>
    );
  }

  render() {

    return (
      <View style={{flex}}>
        <StatusBar barStyle="light-content" />
        <Navigator
          style={{flex}}
          initialRoute={{component: HomeScreen}}
          renderScene={this.mainNavRenderScene.bind(this)}
          navigationBar={this.navigationBarRender()}
        />
      </View>
    );
  }

}
//<View style={{backgroundColor: 'red', width: 100, height: 100, position: 'absolute', top: 0}}></View>
AppRegistry.registerComponent('PopStats', () => PopStats);
