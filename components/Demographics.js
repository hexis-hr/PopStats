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
  Image,
  TouchableHighlight,
} from 'react-native';

import style from '../styles/style';
import fetcher from '../library/fetcher';
import helper from '../library/helper';
import YearNavigator from './YearNavigator';
import Disclaimer from './Disclaimer';

const MIN_PERCENTAGE = 25;
var flex = 1;
var genders = ['male', 'female'];
var ranges = ['0_4', '5_11', '12_17', '18_59', '60', 'other_value'];

class Demographics extends Component {

  constructor (props) {
    super(props);
    this.state = {
      demographics: null,
    };
  }

  componentDidMount () {
    fetcher.demographics(this.props.root.state.year, this.props.route.countryId).then((res) => {
      var demographics = {
        male_total: 0,
        female_total: 0,
      };
      genders.forEach((gender) => { ranges.forEach((range) => { demographics[gender + range] = 0; }); });
      res.forEach((page) => {
        page.data.forEach((value) => {
          demographics.male_total += parseInt(helper.nanFilter(value.male_total_value));
          demographics.female_total += parseInt(helper.nanFilter(value.female_total_value));
          genders.forEach((gender) => {
            ranges.forEach((range) => {
              demographics[gender + range] += parseInt(helper.nanFilter(value[gender + '_' + range]));
            });
          });
        });
      });
      var total = demographics.male_total + demographics.female_total;
      if (total === 0) {
        demographics = false;
      }
      else {
        demographics.percentMale = Math.floor((demographics.male_total / total) * 100);
        demographics.percentFemale = 100 - demographics.percentMale;
        genders.forEach((gender) => { ranges.forEach((range) => {
          demographics[gender + range] =
            ((demographics[gender + range] / demographics[gender + '_total']) * 100).toFixed(1);
        }); });
      }
      this.setState({demographics});
    }).done();
  }

  maleTotalText () {
    var textStyle = [style.demographicsTotalsText, style.textWhite];
    return (<Text style={textStyle}>Male ({this.state.demographics.percentMale}%)</Text>);
  }

  femaleTotalText () {
    var textStyle = [style.demographicsTotalsText, style.textWhite];
    return (<Text style={textStyle}>Female ({this.state.demographics.percentFemale}%)</Text>);
  }

  containerStyleMale () {
    var _style = [style.maleContainer, {flex: this.state.demographics.percentMale}];
    if (this.state.demographics.percentMale < MIN_PERCENTAGE) { return (<View style={_style}></View>); }
    return (<View style={_style}><Image source={require('../img/male.png')} />{this.maleTotalText()}</View>);
  }

  containerStyleFemale () {
    var _style = [style.femaleContainer, {flex: this.state.demographics.percentFemale}];
    if (this.state.demographics.percentFemale < MIN_PERCENTAGE) { return (<View style={_style}></View>); }
    return (<View style={_style}><Image source={require('../img/female.png')} />{this.femaleTotalText()}</View>);
  }

  smallPercentageLabel () {
    if (this.state.demographics.percentMale < MIN_PERCENTAGE) {
      return (<View style={style.maleSmallPercentage}>{this.maleTotalText()}</View>);
    }
    else if (this.state.demographics.percentFemale < MIN_PERCENTAGE) {
      return (<View style={style.femaleSmallPercentage}>{this.femaleTotalText()}</View>);
    }
  }

  render() {
    if (this.state.demographics === null) { return this.props.root.renderLoader(); }
    if (this.state.demographics === false) {
      return (
        <View style={[{flex}, style.mainContainerWithNestedNavigationBar]}>
          <Text>No data</Text>
        </View>
      );
    }
    return (
      <View style={[{flex}, style.mainContainerWithNestedNavigationBar]}>
        <View style={{flexDirection: 'row'}}>
          {this.containerStyleMale()}
          {this.containerStyleFemale()}
          {this.smallPercentageLabel()}
        </View>
        <View style={[style.card, style.cardPadding]}>
          <View>
            <Text style={style.barChart_row_label}>Age</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 15}}>
              {ranges.map((val) => {
                return (
                  <Text key={'male' + val} style={style.barChart_row_value}>
                    {this.state.demographics['male' + val]}%
                  </Text>
                );
              })}
            </View>
            <View style={{flex: 25, alignItems: 'stretch'}}>
              {ranges.map((val) => {
                var animation = new Animated.Value(0);
                var to = Math.floor(this.state.demographics['male' + val]);
                Animated.timing(animation, {toValue: to}).start();
                return (
                  <View key={'m' + val} style={style.barChart_row_line}>
                    <View style={[
                      style.barChart_row_line_inner,
                      {backgroundColor: 'white', flex: 100 - to}
                    ]}></View>
                    <Animated.View style={[
                      style.barChart_row_line_inner,
                      style.maleBar,
                      {flex: animation}
                    ]}></Animated.View>
                  </View>
                );
              })}
            </View>
            <View style={{flex: 20}}>
              <Text style={style.barChart_row_label}>0-4</Text>
              <Text style={style.barChart_row_label}>5-11</Text>
              <Text style={style.barChart_row_label}>12-17</Text>
              <Text style={style.barChart_row_label}>18-59</Text>
              <Text style={style.barChart_row_label}>60+</Text>
              <Text style={style.barChart_row_label}>N/A</Text>
            </View>
            <View style={{flex: 25}}>
              {ranges.map((val) => {
                var animation = new Animated.Value(0);
                var to = Math.floor(this.state.demographics['female' + val]);
                Animated.timing(animation, {toValue: to}).start();
                return (
                  <View key={'f' + val} style={style.barChart_row_line}>
                    <Animated.View style={[
                      style.barChart_row_line_inner,
                      style.femaleBar,
                      {flex: animation}
                    ]}></Animated.View>
                    <View style={[
                      style.barChart_row_line_inner,
                      {backgroundColor: 'white', flex: 100 - to}
                    ]}></View>
                  </View>
                );
              })}
            </View>
            <View style={{flex: 15, alignItems: 'flex-end'}}>
              {ranges.map((val) => {
                return (
                  <Text key={'female' + val} style={style.barChart_row_value}>
                    {this.state.demographics['female' + val]}%
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
        <Disclaimer />
      </View>
    );
  }

}

module.exports = Demographics;
