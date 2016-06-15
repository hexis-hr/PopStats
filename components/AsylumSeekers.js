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
          if (value.rsd_procedure === 'G / NA') {
            asylumSeekers.push(value);
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
      <View style={style.asylumSeekersCard}>
        <View style={style.asylumSeekersPadding}>
          <Text style={style.asylumSeekersTitle}>{row.country_of_origin_en}</Text>
          <Text style={style.asylumSeekersTitleSmall}>Asylum-seekers originating from {row.country_of_origin_en}</Text>
        </View>
        <View style={style.asylumSeekersLine}/>
        <View style={style.asylumSeekersPadding}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.asylumSeekersTitle, {flex}]}>Total persons start-year</Text>
            <Text style={style.asylumSeekersTitle}>{row.pending_start_of_year_total_persons}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.asylumSeekersTitleSmall, {flex}]}>Of which UNHCR assisted</Text>
            <Text style={style.asylumSeekersTitleSmall}>{row.pending_start_of_year_of_which_unhcr_assisted}</Text>
          </View>
        </View>
        <View style={style.asylumSeekersLine}/>
        <View style={style.asylumSeekersPadding}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.asylumSeekersTitle, {flex}]}>Applied during year</Text>
            <Text style={style.asylumSeekersTitle}>{row.applied_during_year}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.asylumSeekersTitleSmall, {flex}]}>Recognized</Text>
            <Text style={style.asylumSeekersTitleSmall}>{row.decisions_recognized}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.asylumSeekersTitleSmall, {flex}]}>Rejected</Text>
            <Text style={style.asylumSeekersTitleSmall}>{row.rejected}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.asylumSeekersTitleSmall, {flex}]}>Otherwise closed</Text>
            <Text style={style.asylumSeekersTitleSmall}>{row.otherwise_closed}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.asylumSeekersTitleSmall, {flex}]}>Other</Text>
            <Text style={style.asylumSeekersTitleSmall}>{row.decisions_other}</Text>
          </View>
        </View>
        <View style={style.asylumSeekersLine}/>
        <View style={style.asylumSeekersPadding}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.asylumSeekersTitle, {flex}]}>Total persons end-year</Text>
            <Text style={style.asylumSeekersTitle}>{row.pending_end_of_year_total_persons}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.asylumSeekersTitleSmall, {flex}]}>Of which UNHCR assisted</Text>
            <Text style={style.asylumSeekersTitleSmall}>{row.pending_end_of_year_of_which_unhcr_assisted}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.asylumSeekers === null) { return this.props.root.renderLoader(); }
    if (this.state.asylumSeekers._dataBlob.s1.length === 0) { return (
        <View style={[{flex}, style.mainContainerWithNestedNavigationBar]}>
          <Text>No data</Text>
        </View>
      );
    }
    return (
      <View style={[{flex}, style.mainContainerWithNestedNavigationBar]}>
        <View style={style.asylumSeekersPadding}>
          <View style={{flex}}>
            <Text style={style.asylumSeekersTitle}>Refugee status determination</Text>
            <Text style={style.asylumSeekersTitleSmall}>Progress of asylum-seekers</Text>
          </View>
          <View style={style.asylumSeekersLine}/>
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
