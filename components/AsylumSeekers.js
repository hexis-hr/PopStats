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
  Animated,
  ListView,
  TouchableHighlight,
} from 'react-native';

import style from '../styles/style';
import fetcher from '../library/fetcher';
import helper from '../library/helper';
import YearNavigator from './YearNavigator';

var flex = 1;
var dataToIncrement = [
  'applied_during_year',
  'decisions_other',
  'decisions_recognized',
  'otherwise_closed',
  'pending_end_of_year_of_which_unhcr_assisted',
  'pending_end_of_year_total_persons',
  'pending_start_of_year_of_which_unhcr_assisted',
  'pending_start_of_year_total_persons',
  'rejected',
  'total_decisions',
];

class AsylumSeekers extends Component {

  constructor (props) {
    super(props);
    this.state = {
      asylumSeekers: null,
    };
  }

  componentDidMount () {
    var asylumSeekers = [];
    fetcher.asylumSeekers(this.props.root.state.year, this.props.route.countryId).then((res) => {
      res.forEach((page) => {
        page.data.forEach((value) => {
          if (typeof asylumSeekers[value.country_of_origin] === 'undefined') {
            asylumSeekers[value.country_of_origin] = {};
            asylumSeekers[value.country_of_origin].country_of_origin_en = value.country_of_origin_en;
            dataToIncrement.map((key) => {
              asylumSeekers[value.country_of_origin][key] = helper.nanFilter(value[key]);
            });
          } else {
            dataToIncrement.map((key) => {
              asylumSeekers[value.country_of_origin][key] += helper.nanFilter(value[key]);
            });
          }
        });
      });
      this.setState({asylumSeekers: (new ListView.DataSource({
        rowHasChanged: helper.rowHasChanged
      })).cloneWithRows(asylumSeekers)});
    }).done();
  }

  renderRow (row) {
    return (
      <View style={[style.card, style.cardMargin]}>
        <View style={[style.card_header]}>
          <View style={{flex}}>
            <Text style={[style.card_header_title]}>
              {row.country_of_origin_en}
            </Text>
            <Text style={[style.card_header_subtitle]}>
              Asylum-seekers originating from {row.country_of_origin_en}
            </Text>
          </View>
        </View>

        <View style={[style.stackList_item, style.stackList_itemPadding]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.stackList_item_title, {flex}]}>Total persons start-year</Text>
            <Text style={[style.stackList_item_body]}>
              {helper.formatNumber(row.pending_start_of_year_total_persons)}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.stackList_item_body, {flex}]}>Of which UNHCR assisted</Text>
            <Text style={style.stackList_item_body}>
              {helper.formatNumber(row.pending_start_of_year_of_which_unhcr_assisted)}
            </Text>
          </View>
        </View>

        <View style={[style.stackList_item, style.stackList_itemPadding]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.stackList_item_title, {flex}]}>Applied during year</Text>
            <Text style={[style.stackList_item_title]}>
              {helper.formatNumber(row.applied_during_year)}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.stackList_item_body, {flex}]}>Recognized</Text>
            <Text style={[style.stackList_item_body]}>
              {helper.formatNumber(row.decisions_recognized)}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.stackList_item_body, {flex}]}>Rejected</Text>
            <Text style={[style.stackList_item_body]}>
              {helper.formatNumber(row.rejected)}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.stackList_item_body, {flex}]}>Otherwise closed</Text>
            <Text style={style.stackList_item_body}>
              {helper.formatNumber(row.otherwise_closed)}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.stackList_item_body, {flex}]}>Other</Text>
            <Text style={style.stackList_item_body}>
              {helper.formatNumber(row.decisions_other)}
            </Text>
          </View>
        </View>

        <View style={[style.stackList_item, style.stackList_itemPadding, style.stackList_itemLast]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.stackList_item_title, {flex}]}>Total persons end-year</Text>
            <Text style={style.stackList_item_title}>
              {helper.formatNumber(row.pending_end_of_year_total_persons)}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.stackList_item_body, {flex}]}>Of which UNHCR assisted</Text>
            <Text style={style.stackList_item_body}>
              {helper.formatNumber(row.pending_end_of_year_of_which_unhcr_assisted)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.asylumSeekers === null) { return this.props.root.renderLoader(); }
    if (Object.keys(this.state.asylumSeekers._dataBlob.s1).length === 0) {
      return (
        <View style={[{flex}, style.mainContainerWithNestedNavigationBar]}>
          <Text>No data</Text>
        </View>
      );
    }
    return (
      <View style={[{flex}, style.mainContainerWithNestedNavigationBar]}>
        <View style={[style.card_header, style.card_headerNoBorder]}>
          <View style={{flex}}>
            <Text style={style.card_header_title}>Refugee status determination</Text>
            <Text style={style.card_header_subtitle}>Progress of asylum-seekers</Text>
          </View>
        </View>
        <ListView
          enableEmptySections={true}
          style={style.asylumSeekersPadding}
          dataSource={this.state.asylumSeekers}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }

}

module.exports = AsylumSeekers;
