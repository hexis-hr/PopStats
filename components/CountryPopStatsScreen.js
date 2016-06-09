import React, { Component } from 'react';
import {
  Text,
  View,
  TabBarIOS,
} from 'react-native';

import style from '../styles/style';
import PersonsOfConcernScreen from './PersonsOfConcernScreen';
import CountriesOfOrigin from './CountriesOfOrigin';
import DemographicsScreen from './DemographicsScreen';

var flex = 1;

class CountryPopStatsScreen extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 1,
    };
  }

  switchTab (selectedTab) {
    this.setState({selectedTab});
  }
  
  render() {
    if (this.state.countryList === null) { return this.renderLoader(); }
    return (
      <View style={[style.mainContainer, style.mainContainerWithNavigationBar, style.lightBackground]}>
        <TabBarIOS
          translucent={false}
          tintColor='#0072BC'
        >
          <TabBarIOS.Item
            selected={this.state.selectedTab === 1}
            onPress={() => this.switchTab(1)}
            title='Persons of concern'
          >
            <PersonsOfConcernScreen
              route={this.props.route}
              nav={this.props.nav}
              root={this.props.root}
            />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 2}
            onPress={() => this.switchTab(2)}
            title='Asylum seekers'
          >
            <CountriesOfOrigin
              route={this.props.route}
              nav={this.props.nav}
              root={this.props.root}
            />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 3}
            onPress={() => this.switchTab(3)}
            title='Demographics'
          >
            <DemographicsScreen
              route={this.props.route}
              nav={this.props.nav}
              root={this.props.root}
            />
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }

}

module.exports = CountryPopStatsScreen;
