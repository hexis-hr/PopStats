/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ListView,
} from 'react-native';

import style from '../styles/style';
import CountryPopStatsScreen from './CountryPopStatsScreen';
import Loader from './Loader';

var flex = 1;
const POPDATA_ORIGIN_URL = 'http://popdata.unhcr.org/api/stats/origin.json';

class CountryListScreen extends Component {

  constructor (props) {
    super(props);
    this.state = {
      countryList: null
    };
  }

  componentDidMount () {
    fetch(POPDATA_ORIGIN_URL).then((res) => res.json()).then((res) => {
      this.setState({
        countryList: (new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        })).cloneWithRowsAndSections({
          'AUTO DETECTED': [{origin_en: "Germany", origin: "DEU"}],
          RECENT: [{origin_en: "Germany", origin: "DEU"}, {origin_en: "Germany", origin: "DEU"}, {origin_en: "Germany", origin: "DEU"}],
          ALPHABETICALLY: res,
        })
      });
    }).done();
  }

  renderSectionHeader (sectionData, sectionID) {
    return (<View style={style.listHeadingContainer}><Text style={style.listHeadingText}>{sectionID}</Text></View>);
  }

  countryInfo (title, countryId) {
    return () => {
      this.props.nav.push({component: CountryPopStatsScreen, title, countryId});
    };
  }

  renderRow (data) {
    return (
      <TouchableHighlight
        style={style.listRowTouchable}
        onPress={this.countryInfo(data.origin_en, data.origin)}
      >
        <View style={style.listRowContainer}>
          <Text style={style.listRowText}>{data.origin_en}</Text>
          <Text style={style.listRowGte}>{'>'}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderSeparator (sectionID, rowID) {
    return (<View key={sectionID + rowID + 'sh'} style={style.listSeparator}/>);
  }
  
  render() {
    if (this.state.countryList === null) { return this.props.root.renderLoader(); }
    return (
      <View style={[style.mainContainer, style.mainContainerWithNavigationBar]}>
        <ListView
          style={style.list}
          dataSource={this.state.countryList}
          renderRow={this.renderRow.bind(this)}
          renderSectionHeader={this.renderSectionHeader}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }

}

module.exports = CountryListScreen;
