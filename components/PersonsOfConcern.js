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
} from 'react-native';

import { PieChart } from 'react-native-ios-charts';
import style from '../styles/style';
import helper from '../library/helper';
import CountriesOfOriginScreen from './CountriesOfOriginScreen';

const RESETTLEMENT_URL = 'http://popdata.unhcr.org/api/stats/resettlement.json?'
const PERSONS_OF_CONCERN_URL = 'http://popdata.unhcr.org/api/stats/persons_of_concern.json?';

var coa = '&coa=';
var year = 'year=';
var cor = '&cor=';
var coo = '&coo=AFG&coo=ALB&coo=DZA&coo=AND&coo=AGO&coo=AIA&coo=ATG&coo=ARG&coo=ARM&coo=ABW&coo=AUS&coo=AUT&coo=AZE&coo=BHS&coo=BHR&coo=BGD&coo=BRB&coo=BLR&coo=BEL&coo=BLZ&coo=BEN&coo=BMU&coo=BTN&coo=BOL&coo=BIH&coo=BWA&coo=BRA&coo=VGB&coo=BRN&coo=BGR&coo=BFA&coo=BDI&coo=CPV&coo=KHM&coo=CMR&coo=CAN&coo=CYM&coo=CAF&coo=TCD&coo=CHL&coo=CHN&coo=HKG&coo=MAC&coo=COL&coo=COM&coo=COG&coo=COK&coo=CRI&coo=HRV&coo=CUB&coo=CUW&coo=CYP&coo=CZE&coo=CIV&coo=PRK&coo=COD&coo=DNK&coo=DJI&coo=DMA&coo=DOM&coo=ECU&coo=EGY&coo=SLV&coo=GNQ&coo=ERI&coo=EST&coo=ETH&coo=FJI&coo=FIN&coo=FRA&coo=GUF&coo=PYF&coo=GAB&coo=GMB&coo=GEO&coo=DEU&coo=GHA&coo=GIB&coo=GRC&coo=GRD&coo=GLP&coo=GTM&coo=GIN&coo=GNB&coo=GUY&coo=HTI&coo=VAT&coo=HND&coo=HUN&coo=ISL&coo=IND&coo=IDN&coo=IRN&coo=IRQ&coo=IRL&coo=ISR&coo=ITA&coo=JAM&coo=JPN&coo=JOR&coo=KAZ&coo=KEN&coo=KIR&coo=KWT&coo=KGZ&coo=LAO&coo=LVA&coo=LBN&coo=LSO&coo=LBR&coo=LBY&coo=LIE&coo=LTU&coo=LUX&coo=MDG&coo=MWI&coo=MYS&coo=MDV&coo=MLI&coo=MLT&coo=MHL&coo=MTQ&coo=MRT&coo=MUS&coo=MEX&coo=FSM&coo=MCO&coo=MNG&coo=MNE&coo=MAR&coo=MOZ&coo=MMR&coo=NAM&coo=NRU&coo=NPL&coo=NLD&coo=NCL&coo=NZL&coo=NIC&coo=NER&coo=NGA&coo=NIU&coo=NFK&coo=NOR&coo=OMN&coo=PAK&coo=PLW&coo=PSE&coo=PAN&coo=PNG&coo=PRY&coo=PER&coo=PHL&coo=POL&coo=PRT&coo=PRI&coo=QAT&coo=KOR&coo=MDA&coo=ROU&coo=RUS&coo=RWA&coo=KNA&coo=LCA&coo=VCT&coo=WSM&coo=SMR&coo=STP&coo=SAU&coo=SEN&coo=SRB&coo=SYC&coo=SLE&coo=SGP&coo=SVK&coo=SVN&coo=SLB&coo=SOM&coo=ZAF&coo=SSD&coo=ESP&coo=LKA&coo=XXA&coo=SDN&coo=SUR&coo=SWZ&coo=SWE&coo=CHE&coo=SYR&coo=TJK&coo=THA&coo=MKD&coo=TIB&coo=TLS&coo=TGO&coo=TON&coo=TTO&coo=TUN&coo=TUR&coo=TKM&coo=TCA&coo=TUV&coo=UGA&coo=UKR&coo=ARE&coo=GBR&coo=TZA&coo=USA&coo=URY&coo=UZB&coo=VUT&coo=XXC&coo=VEN&coo=VNM&coo=WLF&coo=ESH&coo=YEM&coo=ZMB&coo=ZWE';
var page = '&page=';

const RESULTS_PER_PAGE = 50;
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
    var pageNumber = 1;
    var personsOfConcern = {
      total: 0,
      refugees: 0,
      asylum_seekers: 0,
      idps: 0,
      returnees: 0,
      stateless_persons: 0,
      others_of_concern: 0,
    };
    var urlWithoutPage =
      PERSONS_OF_CONCERN_URL + year + this.props.nestedRoute.year + cor + this.props.route.countryId + coo + page;
    var url = urlWithoutPage + pageNumber;

    fetch(url).then((res) => res.json()).then((res) => {

      var promises = [];

      if (res.total > res.data.length) {
        var pages = Math.ceil(res.total / RESULTS_PER_PAGE);
        for (var i = pageNumber + 1; i <= pages; i++) {
          promises.push(fetch(urlWithoutPage + i));
        }
      }

      Promise.all(promises).then((newPages) => {
        var jsons = [];
        newPages.forEach((value) => {
          jsons.push(value.json());
        });
        Promise.all(jsons).then((jsonData) => {
          var countriesData = [];

          jsonData.push(res);
          jsonData.forEach((value, key) => {
            value.data.forEach((value, key) => {
              countriesData.push(value);
            });
          });

          countriesData.forEach((value, key) => {
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

          countriesData.sort((a, b) => {
            return helper.nanFilter(b.total_population) - helper.nanFilter(a.total_population);
          });

          //var ds = 1;
          //this.state.topCountriesOfOrigin = ds.cloneWithRows(countriesData.slice(0,6));
          this.state.personsOfConcern = personsOfConcern;
          //labels: [
          //  'Refugess',
          //  'Asylum-seekers',
          //  'IDP\'s',
          //  'Returnees',
          //  'Stateless persons',
          //  'Others',
          //],

          var urlWithoutPage =
            RESETTLEMENT_URL + year + this.props.nestedRoute.year + coa + this.props.route.countryId + coo +
            '&coo=STA'+ page;

          var url = urlWithoutPage + pageNumber;

          fetch(url).then((res) => res.json()).then((res) => {

            var promises = [];

            if (res.total > res.data.length) {
              var pages = Math.ceil(res.total / RESULTS_PER_PAGE);
              for (var i = pageNumber + 1; i <= pages; i++) {
                promises.push(fetch(urlWithoutPage + i));
              }
            }

            Promise.all(promises).then((newPages) => {
              var jsons = [];
              newPages.forEach((value) => {
                jsons.push(value.json());
              });

              Promise.all(jsons).then((jsonData) => {
                var resettlementData = [];
                jsonData.push(res);
                jsonData.forEach((value, key) => {
                  value.data.forEach((value, key) => {
                    resettlementData.push(value);
                  });
                });

                var resettlementTotal = 0;
                resettlementData.forEach((value) => resettlementTotal += helper.nanFilter(value.value));

                resettlementData.sort((a, b) => {
                  return helper.nanFilter(b.value) - helper.nanFilter(a.value);
                });

                //var resettlementDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                //this.state.topCountriesResettlement = resettlementDataSource.cloneWithRows(resettlementData.slice(0,6));

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
                  topCountriesOfOrigin: (new ListView.DataSource({rowHasChanged})).cloneWithRows(countriesData.slice(0,6)),
                  resettlement: (new ListView.DataSource({rowHasChanged})).cloneWithRows(resettlementData.slice(0,6)),
                  personsOfConcernChart,
                  resettlementTotal
                });
              });
            });
          }).done();
        });
      });
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
      <View style={[style.stackList_item]}>
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

  render() {
    if (this.state.resettlement === null) { return this.props.root.renderLoader(); }
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
                  countryId: this.props.route.countryId
                });
              }}
            >
              <View style={{flex, flexDirection: 'row'}}>
                <Text style={style.listRowText}>Countries of origin</Text>
                <Text style={style.listRowGte}>{'>'}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
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
          <View style={style.countriesOfOriginFooter}>
            <TouchableHighlight style={{flex}}>
              <View style={{flex, flexDirection: 'row'}}>
                <Text style={style.listRowText}>Resettlement</Text>
                <Text style={style.listRowGte}>{'>'}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }

}

module.exports = PersonsOfConcern;
