/**
 * @providesModule CountryStats
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ListView,
  Navigator,
  Alert,
  TabBarIOS,
  PickerIOS,
} from 'react-native';

import styles from './style.js';
import CountryStatsByYear from './CountryStatsByYear.js';
import _ from 'lodash';

var defaultYear = 2014;
const MAX_YEAR = 2014;
const MIN_YEAR = 1951;

class CountryStats extends Component {

  constructor (props) {
    super(props);
    var context = this;
    this.state = {
      selectedTab: 1,
      currentYear: defaultYear,
      leftButtonDisabled: false,
      rightButtonDisabled: false,
      pickerActive: false,
      pickerYears: _.range(1951, (new Date()).getFullYear() + 1),
      navRouteMapper: {
        LeftButton: function (route, navigator, index, navState) {
          return(
            <TouchableHighlight
              disabled={context.state.leftButtonDisabled}
              onPress={() => {
                context.setState({leftButtonDisabled: true, rightButtonDisabled: true});
                if (context.state.currentYear - 1 >= MIN_YEAR) {
                  context.state.currentYear -= 1;
                  navigator.replace({
                    year: context.state.currentYear,
                    view: CountryStatsByYear,
                    sceneConfig: Navigator.SceneConfigs.FloatFromLeft,
                  });
                }
                else {
                  Alert.alert('Reached minimal year', 'There is no more data available');
                }
              }}
              style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}
            >
              <Text style={[styles.navigationBar, {color: '#1276BB'}]}>{'<'}</Text>
            </TouchableHighlight>
          );
        },
        Title: (route, navigator, index, navState) => {
          return(
            <TouchableHighlight
              onPress={() => { context.setState({pickerActive: !context.state.pickerActive}); }}
              style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}
            >
              <View>
                <Text style={[styles.navigationBar, {color: 'black'}]}>{this.state.currentYear}</Text>
              </View>
            </TouchableHighlight>
          );
        },
        RightButton: (route, navigator, index, navState)  => {
          var currentYear = (new Date()).getFullYear();
          if (context.state.currentYear !== currentYear)
          return(
            <TouchableHighlight
              onPress={() => {
                if (context.state.currentYear + 1 <= (new Date()).getFullYear()) {
                  context.setState({leftButtonDisabled: true, rightButtonDisabled: true});
                  context.state.currentYear += 1;
                  navigator.replace({
                    year: context.state.currentYear,
                    view: CountryStatsByYear,
                    sceneConfig: Navigator.SceneConfigs.FloatFromRight,
                  });
                }
                else {
                  Alert.alert('You cant go over current year');
                }
              }}
              style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}
            >
              <Text style={[styles.navigationBar, {color: '#1276BB'}]}>{'>'}</Text>
            </TouchableHighlight>
          );
        }
      },
    }
  }

  renderPicker () {
    if (this.state.pickerActive) {
      return (
        <PickerIOS
          style={{backgroundColor: 'white'}}
          selectedValue={this.state.currentYear}
          onValueChange={(value) => {
            this.setState({currentYear: value});
            this.state.nav.replace({
              year: this.state.currentYear,
              view: CountryStatsByYear,
            });
          }}
        >
        {
          this.state.pickerYears.map((year) => {
            return (
              <PickerIOS.Item
                key={year}
                value={year}
                label={year.toString()}
              />
            );
          })
        }
        </PickerIOS>
      );
    }
  }

  render () {
    return (
      <View style={{flex: 1, marginTop: 65}}>
        {this.renderPicker()}
        <TabBarIOS
          unselectedTintColor="#666"
          tintColor="#1074BA"
          barTintColor="white"
        >
          <TabBarIOS.Item
            title='Persons of concern'
            selected={this.state.selectedTab === 1}
            onPress={() => { this.tabSwitch(1); }}
          >
            <Navigator
              style={[styles.container, {backgroundColor: '#EFF5F9', marginBottom: 50}]}
              initialRoute={{year: 2014, view: CountryStatsByYear}}
              ref={(ref) => this.state.nav = ref}
              renderScene={function (route, nav) {
                return React.createElement(route.view, {
                  route: route,
                  parent: this,
                  countryId: this.props.route.countryId,
                  country: this.props.route.title,
                  year: this.state.currentYear,
                });
              }.bind(this)}
              configureScene={(route) => {
                if (route.sceneConfig) {
                  return route.sceneConfig;
                }
                return Navigator.SceneConfigs.PushFromRight;
              }}
              navigationBar={
                <Navigator.NavigationBar
                  routeMapper={this.state.navRouteMapper}
                  style={{backgroundColor: '#EFF5F9', flex: 1, top: -20}}
                />
              }
            />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title='Asylum seekers'
            selected={this.state.selectedTab === 2}
            onPress={() => { this.tabSwitch(2); }}
          >
            <Text>test</Text>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title='Demographics'
            selected={this.state.selectedTab === 3}
            onPress={() => { this.tabSwitch(3); }}
          >
            <Text>test2</Text>
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }

  tabSwitch (selectedTab) {
    if (this.state.selectedTab !== selectedTab) {
      this.setState({selectedTab});
    }
  }

}

module.exports = CountryStats;
