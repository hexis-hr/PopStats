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
import PersonsOfConcern from './PersonsOfConcern';
import YearNavigator from './YearNavigator';
import Loader from './Loader';

var flex = 1;

class PersonsOfConcernScreen extends Component {

  constructor (props) {
    super(props);

    //var MIN_YEAR = 1951;
    //var LeftButtonPress = (nav) => {
    //  nav.replace({year: --this.props.root.state.year});
    //};
    //var RightButtonPress = (nav) => {
    //  nav.replace({year: ++this.props.root.state.year});
    //};
    //
    //var LeftButton = (route, nav, index, navState) => {
    //  if (this.props.root.state.year > MIN_YEAR) {
    //    return (
    //      <NavigatorButton
    //        textStyle={style.nestedNavButtonText}
    //        buttonStyle={style.nestedNavButton}
    //        title={'<'}
    //        onPress={() => LeftButtonPress(nav)}
    //      />
    //    );
    //  }
    //};
    //
    //var RightButton = (route, nav, index, navState) => {
    //  if (this.props.root.state.year < (new Date()).getFullYear()) {
    //    return (
    //      <NavigatorButton
    //        textStyle={style.nestedNavButtonText}
    //        buttonStyle={style.nestedNavButton}
    //        title={'>'}
    //        onPress={() => { RightButtonPress(nav); }}
    //      />
    //    );
    //  }
    //};
    //
    //var Title = (route, nav, index, navState) => {
    //  return (
    //    <View style={{flex, justifyContent: 'center'}}>
    //      <Text style={style.nestedNavTitleText}>{route.year}</Text>
    //    </View>
    //  );
    //};
    //
    //this.navigationBar = {LeftButton, RightButton, Title};

  }

  renderScene (route, nav) {
    return (
      <PersonsOfConcern
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
      <View style={[style.mainContainer, style.lightBackground]}>
        <YearNavigator
          initialRoute={{year: this.props.root.state.year}}
          renderScene={this.renderScene.bind(this)}
          root={this.props.root}
        />
      </View>
    );
  }

}

//<Navigator
//  style={{flex}}
//  initialRoute={{year: this.props.root.state.year}}
//  renderScene={this.renderScene.bind(this)}
//  navigationBar={this.renderNavigationBar()}
///>

module.exports = PersonsOfConcernScreen;
