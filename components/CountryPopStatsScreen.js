import React, { Component } from 'react';
import {
  Text,
  View,
  TabBarIOS,
  Platform,
} from 'react-native';

import style from '../styles/style';
import PersonsOfConcernScreen from './PersonsOfConcernScreen';
import CountriesOfOrigin from './CountriesOfOrigin';
import DemographicsScreen from './DemographicsScreen';
import AsylumSeekersScreen from './AsylumSeekersScreen';
import TabBar from './TabBar';

var flex = 1;

var tabTitle = {
  personsOfConcern: 'Persons of concern',
  asylumSeekers: 'Asylum seekers',
  demographics: 'Demographics',
};

class CountryPopStatsScreen extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 1,
    };
    this.iconManager = {
      personsOfConcern: () =>
        this.state.selectedTab === 1 ? require('../img/tabs/menu-poc-active.png') : require('../img/tabs/menu-poc.png'),
      asylumSeekers: () => require('../img/tabs/menu-asylum.png'),
      demographics: () => require('../img/tabs/menu-demo.png'),
    };
  }

  switchTab (selectedTab) {
    if (this.state.selectedTab !== selectedTab) {
      this.setState({selectedTab});
    }
  }

  getTabContent (component) {
    return React.createElement(component, {route: this.props.route, nav: this.props.nav, root: this.props.root});
  }

  renderIosTabs () {
    return (
      <TabBarIOS
        translucent={false}
        tintColor='#0072BC'
      >
        <TabBarIOS.Item
          icon={
              this.state.selectedTab === 1 ?
              require('../img/tabs/menu-poc-active.png') :
              require('../img/tabs/menu-poc.png')
            }
          selected={this.state.selectedTab === 1}
          onPress={() => this.switchTab(1)}
          title={tabTitle.personsOfConcern}
        >
          <PersonsOfConcernScreen
            route={this.props.route}
            nav={this.props.nav}
            root={this.props.root}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../img/tabs/menu-asylum.png')}
          selected={this.state.selectedTab === 2}
          onPress={() => this.switchTab(2)}
          title={tabTitle.asylumSeekers}
        >
          <AsylumSeekersScreen
            route={this.props.route}
            nav={this.props.nav}
            root={this.props.root}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../img/tabs/menu-demo.png')}
          selected={this.state.selectedTab === 3}
          onPress={() => this.switchTab(3)}
          title={tabTitle.demographics}
        >
          <DemographicsScreen
            route={this.props.route}
            nav={this.props.nav}
            root={this.props.root}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

  renderAndroidTabs () {
    var content = [
      {
        title: tabTitle.personsOfConcern,
        image: require('../img/tabs/menu-poc.png'),
        imageActive: require('../img/tabs/menu-poc-active.png'),
        component: this.getTabContent(PersonsOfConcernScreen),
      },
      {
        title: tabTitle.asylumSeekers,
        image: require('../img/tabs/menu-asylum.png'),
        imageActive: require('../img/tabs/menu-asylum-active.png'),
        component: this.getTabContent(AsylumSeekersScreen),
      },
      {
        title: tabTitle.demographics,
        image: require('../img/tabs/menu-demo.png'),
        imageActive: require('../img/tabs/menu-demo-active.png'),
        component: this.getTabContent(DemographicsScreen),
      },
    ];
    return (<TabBar content={content} />);
  }

  render() {
    if (this.state.countryList === null) { return this.renderLoader(); }
    return (
      <View style={[style.mainContainer, style.mainContainerWithNavigationBar, style.lightBackground]}>
        {(() => {
          if (Platform.OS === 'android') {
            return this.renderAndroidTabs();
          } else {
            return this.renderIosTabs();
          }
        })()}
      </View>
    );
  }

}

module.exports = CountryPopStatsScreen;
