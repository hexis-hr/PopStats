/**
 * @providesModule SelectCountry
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView,
} from 'react-native';

import styles from './style.js';
import CountryStats from './CountryStats.js';

class SelectCountry extends Component {
  
  goToSelectedCountry (country) {
    this.props.main.state.nav.push({view: CountryStats, title: country.origin_en, countryId: country.origin});
  }

  renderCountryItem (country) {
    return (
      <TouchableHighlight onPress={() => this.goToSelectedCountry(country)}>
        <View style={styles.countryListItem}>
          <Text style={styles.countryListText}>{country.origin} - {country.origin_en}</Text>
          <Text style={[styles.countryListText, {alignSelf: 'flex-end', flex: 1, textAlign: 'right'}]}>{'>'}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderSectionHeader (data, id) {
    return (
      <View style={{backgroundColor: '#F2F2F2'}}>
        <Text style={{color: '#979797', padding: 10, fontWeight: 'bold'}}>{data}</Text>
      </View>
    );
  }

  render () {
    return (
      <View style={{flex: 1, marginTop: 65}}>
        <ListView
          dataSource={this.props.main.state.data.countries}
          renderRow={this.renderCountryItem.bind(this)}
          renderSectionHeader={this.renderSectionHeader}
        ></ListView>
      </View>
    );
  }

}

module.exports = SelectCountry;
