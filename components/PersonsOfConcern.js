/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  ScrollView,
  TouchableHighlight,
  Image,
} from 'react-native';

import { PieChart } from 'react-native-ios-charts';
import style from '../styles/style';
import helper from '../library/helper';
import CountriesOfOriginScreen from './CountriesOfOriginScreen';
import Disclaimer from './Disclaimer';

const RESETTLEMENT_URL = 'http://api.hexis.hr/popstats/resettlement'
const PERSONS_OF_CONCERN_URL = 'http://api.hexis.hr/popstats/persons_of_concern';

var flex = 1;
var dataKeys = {
  'Refugess': 'refugees',
  'Asylum-seekers': 'asylum_seekers',
  'IDP\'s': 'idps',
  'Returnees': 'returnees',
  'Stateless persons': 'stateless_persons',
  'Others': 'others_of_concern',
};

class PersonsOfConcern extends Component {

  constructor (props) {
    super(props);
    this.state = {
      personsOfConcern: null,
      personsOfConcernTotal: null,
      personsOfConcernChart: null,
      personsOfConcernList: null,
      topCountriesOfOrigin: null,
      resettlement: null,
      resettlementTotal: null,
    };
  }

  fetchDataForSelectedYear () {

    var personsOfConcern = {
      total: 0,
      refugees: 0,
      asylum_seekers: 0,
      idps: 0,
      returnees: 0,
      stateless_persons: 0,
      others_of_concern: 0,
    };

    var url =
      PERSONS_OF_CONCERN_URL + '/year/' + this.props.root.state.year + '/country/' + this.props.route.countryId;

    fetch(url).then((res) => res.json()).then((res) => {

      res.data.forEach((value, key) => {
        personsOfConcern.total += helper.nanFilter(value.total_population);
        personsOfConcern.refugees += helper.nanFilter(value.refugees) +
          helper.nanFilter(value.people_in_refugee_like_situations);
        personsOfConcern.asylum_seekers += helper.nanFilter(value.asylum_seekers);
        personsOfConcern.idps += helper.nanFilter(value.idps) +
          helper.nanFilter(value.people_in_idp_like_situations);
        personsOfConcern.returnees += helper.nanFilter(value.returned_idps) +
          helper.nanFilter(value.returned_refugees);
        personsOfConcern.stateless_persons += helper.nanFilter(value.stateless_persons);
        personsOfConcern.others_of_concern += helper.nanFilter(value.others_of_concern);
      });

      res.data.sort((a, b) => {
        return helper.nanFilter(b.total_population) - helper.nanFilter(a.total_population);
      });

      this.state.personsOfConcern = personsOfConcern;

      var url =
        RESETTLEMENT_URL + '/year/' + this.props.nestedRoute.year + '/country/' + this.props.route.countryId;

      fetch(url).then((res) => res.json()).then((res2) => {

        var resettlementTotal = 0;
        res2.data.forEach((value) => resettlementTotal += helper.nanFilter(value.value));

        res2.data.sort((a, b) => {
          return helper.nanFilter(b.value) - helper.nanFilter(a.value);
        });

        var personsOfConcernChart = {
          dataSets: [{
            drawValues: false,
            values: [
              this.state.personsOfConcern.refugees,
              this.state.personsOfConcern.asylum_seekers,
              this.state.personsOfConcern.idps,
              this.state.personsOfConcern.returnees,
              this.state.personsOfConcern.stateless_persons,
              this.state.personsOfConcern.others_of_concern,
            ],
            colors: ['#E59696', '#8496AB', '#96D4CB', '#C3C3C3', '#CDB657', '#BC96D2'],
          }],
          backgroundColor: 'transparent',
          showLegend: false,
          userInteractionEnabled: false,
        };

        var rowHasChanged = (row1, row2) => row1 !== row2;
        this.setState({
          personsOfConcernTotal: personsOfConcern.total,
          personsOfConcern: (new ListView.DataSource({rowHasChanged})).cloneWithRows({
            'Refugess': {
              value: this.state.personsOfConcern.refugees,
              color: '#E59696',
            },
            'Asylum-seekers': {
              value: this.state.personsOfConcern.asylum_seekers,
              color: '#8496AB',
            },
            'IDP\'s': {
              value: this.state.personsOfConcern.idps,
              color: '#96D4CB',
            },
            'Returnees': {
              value: this.state.personsOfConcern.returnees,
              color: '#C3C3C3',
            },
            'Stateless persons': {
              value: this.state.personsOfConcern.stateless_persons,
              color: '#CDB657',
            },
            'Others': {
              value: this.state.personsOfConcern.others_of_concern,
              color: '#BC96D2',
            },
          }),
          topCountriesOfOrigin: (new ListView.DataSource({rowHasChanged})).cloneWithRows(res.data.slice(0,6)),
          resettlement: (new ListView.DataSource({rowHasChanged})).cloneWithRows(res2.data.slice(0,6)),
          personsOfConcernChart,
          resettlementTotal
        })
      }).done();
    }).done();
  }

  componentDidMount () {
    this.fetchDataForSelectedYear();
  }

  renderRowStatistics (row, section, key) {
    return (
      <View style={{flex, flexDirection: 'row', alignItems: 'center'}}>
        <View style={[style.statisticsLegendCircle, {backgroundColor: row.color, borderColor: row.color}]}></View>
        <Text style={[style.statisticsLegendText, {flex}]}>{key}</Text>
        <Text style={style.statisticsLegendText}>{helper.formatNumber(row.value)}</Text>
      </View>
    );
  }

  renderSeparatorStatistics (sectionId, rowId) {
    if (rowId !== 'Others') { return (<View key={rowId + 'k'} style={style.statisticsSeparator}/>); }
  }

  renderRowTopCountriesOfOrigin (row, section, key) {
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

  renderSeparatorTopCountriesOfOrigin (sectionId, rowId) {
    if (rowId !== '5') { return (<View key={rowId + 'k'} style={style.statisticsSeparator}/>); }
  }

  renderRowResettlement (row) {
    return (
      <View style={{flex, flexDirection: 'row'}}>
        <Text style={[style.countriesOfOriginText, {flex}]}>{row.country_of_origin_en}</Text>
        <Text style={style.countriesOfOriginText}>{helper.formatNumber(row.value)}</Text>
      </View>
    );
  }

  renderTopResettlement () {
    if (this.state.resettlementTotal < 1) return null;
    return (
      <View style={[style.card, style.cardMargin]}>
        <View style={style.card_header}>
          <View style={{flex}}>
            <Text style={style.card_header_title}>Resettlement</Text>
            <Text style={style.card_header_subtitle}>Total persons resettled</Text>
          </View>
          <Text style={style.card_header_value}>{helper.formatNumber(this.state.resettlementTotal)}</Text>
        </View>
        <View style={style.statisticsBody}>
          <ListView
            style={{flex, padding: 10}}
            dataSource={this.state.resettlement}
            renderRow={this.renderRowResettlement}
            renderSeparator={this.renderSeparatorTopCountriesOfOrigin}
            scrollEnabled={false}
            enableEmptySections={true}
          />
        </View>
      </View>
    );
    //<View style={style.countriesOfOriginFooter}>
    //  <TouchableHighlight style={{flex}}>
    //    <View style={{flex, flexDirection: 'row'}}>
    //      <Text style={style.listRowText}>Resettlement</Text>
    //      <Text style={style.listRowGte}>{'>'}</Text>
    //    </View>
    //  </TouchableHighlight>
    //</View>
  }

  render() {
    if (this.state.resettlement === null) { return this.props.root.renderLoader(); }
    if (this.state.personsOfConcernTotal < 1) { return this.props.root.renderNoData(); }
    return (
      <ScrollView style={[{flex}, style.mainContainerWithNestedNavigationBar]}>
        <View style={[style.card, style.cardMargin]}>
          <View style={style.card_header}>
            <View style={{flex}}>
              <Text style={style.card_header_title}>Persons of concern</Text>
              <Text style={style.card_header_subtitle}>Total persons of concern</Text>
            </View>
            <Text style={style.card_header_value}>{helper.formatNumber(this.state.personsOfConcernTotal)}</Text>
          </View>
          <View style={style.statisticsBody}>
            <PieChart config={this.state.personsOfConcernChart} style={style.statisticsChart}/>
            <View style={style.statisticsChartLegend}>
              <ListView
                style={{flex: 0, paddingRight: 8}}
                dataSource={this.state.personsOfConcern}
                renderRow={this.renderRowStatistics}
                renderSeparator={this.renderSeparatorStatistics}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
        <View style={[style.card, style.cardMargin]}>
          <View style={style.card_header}>
            <View style={{flex}}>
              <Text style={style.card_header_title}>Countries of origin</Text>
              <Text style={style.card_header_subtitle}>Total persons per country of origin</Text>
            </View>
          </View>
          <View style={style.statisticsBody}>
            <ListView
              style={{flex, padding: 10}}
              dataSource={this.state.topCountriesOfOrigin}
              renderRow={this.renderRowTopCountriesOfOrigin}
              renderSeparator={this.renderSeparatorTopCountriesOfOrigin}
              enableEmptySections={true}
            />
          </View>
          <View style={style.countriesOfOriginFooter}>
            <TouchableHighlight
              style={{flex}}
              onPress={() => {
                this.props.nav.push({
                  component: CountriesOfOriginScreen,
                  countryId: this.props.route.countryId,
                  title: this.props.route.title,
                });
              }}
            >
              <View style={{flex, flexDirection: 'row'}}>
                <Text style={style.listRowText}>Countries of origin</Text>
                <Image
                  style={{alignSelf: 'center', marginRight: 8}}
                  source={require('../img/navigation/arrowRight.png')}
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
        {this.renderTopResettlement()}
        <Disclaimer />
      </ScrollView>
    );
  }

}

module.exports = PersonsOfConcern;
