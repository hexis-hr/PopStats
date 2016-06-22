import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

import CountriesOfOrigin from './CountriesOfOrigin';
import style from '../styles/style';
import helper from '../library/helper';

var flex = 1;

class TabBar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      active: 0,
    }
  }

  renderTabs () {
    return this.props.content.map((data, active) => {
      return (
        <TouchableWithoutFeedback
          key={active}
          style={{flex}}
          onPress={() => this.setState({active})}
        >
          <View style={tabBarStyle.tab}>
            <Image source={active === this.state.active ? data.imageActive : data.image} />
            <Text
              style={[tabBarStyle.tabText, active === this.state.active ? {color: '#0072BC'} : {}]}
            >
              {data.title}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }

  renderContent () {
    return (this.props.content[this.state.active].component);
  }

  render() {
    return (
      <View style={{flex}}>
        {this.renderContent()}
        <View style={tabBarStyle.bar}>
          {this.renderTabs()}
        </View>
      </View>
    );
  }

}

const tabBarStyle = StyleSheet.create({
  bar: {
    bottom: 0,
    flex: 1,
    overflow: 'hidden',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderColor: style.colors.backgroundGrey,
    height: 49,
    width: Dimensions.get('window').width,
  },
  tab: {
    height: 48,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    textAlign: 'center',
    fontSize: 10,
  }
});

module.exports = TabBar;
