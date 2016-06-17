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
  ListView,
  TouchableHighlight,
} from 'react-native';

import style from '../styles/style';
import fetcher from '../library/fetcher';
import helper from '../library/helper';
import YearNavigator from './YearNavigator';
import Disclaimer from './Disclaimer';

const TOTAL = 0;
const ALPHABETICALLY = 1;

var flex = 1;

var sortByTotal = (a, b) => {
  return helper.nanFilter(b.total_population) - helper.nanFilter(a.total_population);
};

var sortByName = (a, b) => {
  if (a.country_of_origin_en < b.country_of_origin_en)
    return -1;
  if (a.country_of_origin_en > b.country_of_origin_en)
    return 1;
  return 0;
};

class CountriesOfOrigin extends Component {

  constructor (props) {
    super(props);
    this.state = {
      countriesOfOrigin: null,
      sort: TOTAL,
    };
  }

  setSortByTotal () {
    if (this.state.sort !== TOTAL) {
      this.setState({
        sort: TOTAL,
        countriesOfOrigin: (new ListView.DataSource({
          rowHasChanged: helper.rowHasChanged
        })).cloneWithRows(this.state.countriesOfOrigin._dataBlob.s1.sort(sortByTotal)),
      });
    }
  }

  setSortByAlpha () {
    if (this.state.sort !== ALPHABETICALLY) {
      this.setState({
        sort: ALPHABETICALLY,
        countriesOfOrigin: (new ListView.DataSource({
          rowHasChanged: helper.rowHasChanged
        })).cloneWithRows(this.state.countriesOfOrigin._dataBlob.s1.sort(sortByName)),
      });
    }
  }

  fetchData () {

    var currentSort = null;

    switch (this.state.sort) {
      case TOTAL : currentSort = sortByTotal; break;
      case ALPHABETICALLY : currentSort = sortByName; break;
    }

    var promise = fetcher.personsOfConcern(this.props.root.state.year, this.props.route.countryId);
    promise.then((data) => {
      this.setState({
        countriesOfOrigin: (new ListView.DataSource({
          rowHasChanged: helper.rowHasChanged
        })).cloneWithRows(data.countriesData.sort(currentSort)),
      });
    });
  }

  componentDidMount () {
    this.fetchData();
  }

  renderRow (row) {
    return (
      <View style={[style.stackList_item, style.stackList_itemNoBorder]}>
        <View style={{flex, flexDirection: 'row'}}>
          <Text style={[style.stackList_item_title, {flex}]}>{row.country_of_origin_en}</Text>
          <Text style={[style.stackList_item_title]}>{helper.formatNumber(row.total_population)}</Text>
        </View>
        {
          Object.keys(helper.personsOfConcernKeys).map(function(value) {
            if (row[helper.personsOfConcernKeys[value]]) {
              return (
                <View key={helper.personsOfConcernKeys[value] + row.country_of_origin} style={{flex, flexDirection: 'row'}}>
                  <Text style={[style.stackList_item_body, {flex}]}>{value}</Text>
                  <Text style={[style.stackList_item_body]}>{helper.formatNumber(row[helper.personsOfConcernKeys[value]])}</Text>
                </View>
              );
            }
          })
        }
      </View>
    );
  }

  renderSeparator (sectionId, rowId) {
    return (<View key={rowId + 'k'} style={[style.statisticsSeparator, {marginVertical: 2}]}/>);
  }

  selectedSortButtonStyle (sort) {
    if (this.state.sort === sort) {
      return style.backgroundBlue;
    }
    return style.backgroundWhite;
  }

  selectedSortTextStyle (sort) {
    if (this.state.sort === sort) {
      return style.textWhite;
    }
    return style.textBlue;
  }

  render() {
    if (this.state.countriesOfOrigin === null) { return this.props.root.renderLoader(); }
    return (
      <View style={[{flex}, style.mainContainerWithNestedNavigationBar, style.countriesOfOriginContainer]}>
        <View style={[style.card_header, style.card_headerNoPadding]}>
          <View style={{flex}}>
            <Text style={style.card_header_title}>Countries of origin</Text>
            <Text style={style.card_header_subtitle}>Total persons per country of origin</Text>
          </View>
        </View>
        <View style={style.sortSwitchContainer}>
          <TouchableHighlight
            style={[style.sortByTotal, this.selectedSortButtonStyle(TOTAL)]}
            onPress={this.setSortByTotal.bind(this)}
          >
            <Text style={[style.textWhite, this.selectedSortTextStyle(TOTAL)]}>Most Persons</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[style.sortByName, this.selectedSortButtonStyle(ALPHABETICALLY)]}
            onPress={this.setSortByAlpha.bind(this)}
          >
            <Text style={[style.textBlue, this.selectedSortTextStyle(ALPHABETICALLY)]}>Alphabetically</Text>
          </TouchableHighlight>
        </View>
        <ListView
          style={{flex}}
          dataSource={this.state.countriesOfOrigin}
          renderSeparator={this.renderSeparator}
          renderRow={this.renderRow}
          renderFooter={() => { return <Disclaimer />; }}
        />
      </View>
    );
  }

}

module.exports = CountriesOfOrigin;
