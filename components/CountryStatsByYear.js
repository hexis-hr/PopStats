/**
 * @providesModule CountryStatsByYear
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
  ScrollView,
  ActivityIndicatorIOS,
} from 'react-native';

import styles from './style.js';

const RESETTLEMENT_URL = 'http://popdata.unhcr.org/api/stats/resettlement.json?'
var coa = '&coa=';

var year = 'year=';
var cor = '&cor=';
var coo = '&coo=AFG&coo=ALB&coo=DZA&coo=AND&coo=AGO&coo=AIA&coo=ATG&coo=ARG&coo=ARM&coo=ABW&coo=AUS&coo=AUT&coo=AZE&coo=BHS&coo=BHR&coo=BGD&coo=BRB&coo=BLR&coo=BEL&coo=BLZ&coo=BEN&coo=BMU&coo=BTN&coo=BOL&coo=BIH&coo=BWA&coo=BRA&coo=VGB&coo=BRN&coo=BGR&coo=BFA&coo=BDI&coo=CPV&coo=KHM&coo=CMR&coo=CAN&coo=CYM&coo=CAF&coo=TCD&coo=CHL&coo=CHN&coo=HKG&coo=MAC&coo=COL&coo=COM&coo=COG&coo=COK&coo=CRI&coo=HRV&coo=CUB&coo=CUW&coo=CYP&coo=CZE&coo=CIV&coo=PRK&coo=COD&coo=DNK&coo=DJI&coo=DMA&coo=DOM&coo=ECU&coo=EGY&coo=SLV&coo=GNQ&coo=ERI&coo=EST&coo=ETH&coo=FJI&coo=FIN&coo=FRA&coo=GUF&coo=PYF&coo=GAB&coo=GMB&coo=GEO&coo=DEU&coo=GHA&coo=GIB&coo=GRC&coo=GRD&coo=GLP&coo=GTM&coo=GIN&coo=GNB&coo=GUY&coo=HTI&coo=VAT&coo=HND&coo=HUN&coo=ISL&coo=IND&coo=IDN&coo=IRN&coo=IRQ&coo=IRL&coo=ISR&coo=ITA&coo=JAM&coo=JPN&coo=JOR&coo=KAZ&coo=KEN&coo=KIR&coo=KWT&coo=KGZ&coo=LAO&coo=LVA&coo=LBN&coo=LSO&coo=LBR&coo=LBY&coo=LIE&coo=LTU&coo=LUX&coo=MDG&coo=MWI&coo=MYS&coo=MDV&coo=MLI&coo=MLT&coo=MHL&coo=MTQ&coo=MRT&coo=MUS&coo=MEX&coo=FSM&coo=MCO&coo=MNG&coo=MNE&coo=MAR&coo=MOZ&coo=MMR&coo=NAM&coo=NRU&coo=NPL&coo=NLD&coo=NCL&coo=NZL&coo=NIC&coo=NER&coo=NGA&coo=NIU&coo=NFK&coo=NOR&coo=OMN&coo=PAK&coo=PLW&coo=PSE&coo=PAN&coo=PNG&coo=PRY&coo=PER&coo=PHL&coo=POL&coo=PRT&coo=PRI&coo=QAT&coo=KOR&coo=MDA&coo=ROU&coo=RUS&coo=RWA&coo=KNA&coo=LCA&coo=VCT&coo=WSM&coo=SMR&coo=STP&coo=SAU&coo=SEN&coo=SRB&coo=SYC&coo=SLE&coo=SGP&coo=SVK&coo=SVN&coo=SLB&coo=SOM&coo=ZAF&coo=SSD&coo=ESP&coo=LKA&coo=XXA&coo=SDN&coo=SUR&coo=SWZ&coo=SWE&coo=CHE&coo=SYR&coo=TJK&coo=THA&coo=MKD&coo=TIB&coo=TLS&coo=TGO&coo=TON&coo=TTO&coo=TUN&coo=TUR&coo=TKM&coo=TCA&coo=TUV&coo=UGA&coo=UKR&coo=ARE&coo=GBR&coo=TZA&coo=USA&coo=URY&coo=UZB&coo=VUT&coo=XXC&coo=VEN&coo=VNM&coo=WLF&coo=ESH&coo=YEM&coo=ZMB&coo=ZWE';
var page = '&page=';
var PERSONS_OF_CONCERN_URL = 'http://popdata.unhcr.org/api/stats/persons_of_concern.json?';
const RESULTS_PER_PAGE = 50;

class CountryStatsByYear extends Component {

  constructor (props) {
    super(props);
    this.state = {
      countryStats: null,
      topCountriesOfOrigin: null,
      resettlementTotal: null,
      topCountriesResettlement: null,
    };
    console.log(this.props.parent.props.main);
  }

  componentDidMount () {
    this.fetchDataForSelectedYear();
  }
  
  componentWillUnmount () {
    console.log(2);  
  }
  
  render () {
    return (
      <View style={{flex: 1}}>
        {this.renderView()}
      </View>
    );
  }

  renderTopCountriesOfOrigin (data) {
    return (
      <View>
        <View style={{flexDirection: 'row', flex: 1, padding: 5}}>
          <Text style={{flexDirection: 'column', flex: 1, textAlign: 'left', fontSize: 16, fontWeight: 'bold'}}>{data.country_of_origin_en}</Text>
          <Text style={{flexDirection: 'column', flex: 1, textAlign: 'right', fontSize: 16, fontWeight: 'bold'}}>{data.total_population}</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1, paddingHorizontal: 5, paddingVertical: 2}}>
          <Text style={{flexDirection: 'column', flex: 1, textAlign: 'left', fontSize: 12, color: '#999'}}>Refugees</Text>
          <Text style={{flexDirection: 'column', flex: 1, textAlign: 'right', fontSize: 12, color: '#999'}}>{data.refugees}</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1, paddingHorizontal: 5, paddingVertical: 2}}>
          <Text style={{flexDirection: 'column', flex: 1, textAlign: 'left', fontSize: 12, color: '#999'}}>Asylum seekers</Text>
          <Text style={{flexDirection: 'column', flex: 1, textAlign: 'right', fontSize: 12, color: '#999'}}>{data.asylum_seekers}</Text>
        </View>
      </View>
    );
  }

  renderTopCountriesResettlement (data) {
    return (
      <View style={{flexDirection: 'row', flex: 1, padding: 5}}>
        <Text style={{flexDirection: 'column', flex: 1, textAlign: 'left', fontSize: 16}}>
          {data.country_of_origin_en}
        </Text>
        <Text style={{flexDirection: 'column', flex: 1, textAlign: 'right', fontSize: 16}}>{data.value}</Text>
      </View>
    );
  }

  renderSeparator (collection) {
    return function (section, row) {
      if (collection.getRowCount() - 1 == row) return;
      return (<View key={row + 's'} style={{height: 1, backgroundColor: '#999'}} />);
    }
  }

  renderView () {

    if (this.state.topCountriesOfOrigin === null || this.state.topCountriesResettlement === null) {
      return (
        <View style={{flex: 1, marginTop: 65, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicatorIOS
            animating={true}
            size='large'
            color='#1074BA'
          />
        </View>
      );
    }

    return (
      <ScrollView style={{flex: 1, marginTop: 50}}>
        <View style={styles.countryStatsDataContainer}>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#979797', padding: 8, flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.countryStatsHeading1}>Persons of concern</Text>
              <Text style={styles.countryStatsHeading2}>Total persons within {this.props.country}</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={[styles.countryStatsHeading1, {textAlign: 'right', padding: 4, fontSize: 20}]}>
                {this.state.countryStats.total}
              </Text>
            </View>
          </View>
          <View style={{padding: 5}}>
            <Text>Refugess {this.state.countryStats.refugees}</Text>
            <Text>Asylum-seekers {this.state.countryStats.asylum_seekers}</Text>
            <Text>IDP's {this.state.countryStats.idps}</Text>
            <Text>Returnees {this.state.countryStats.returnees}</Text>
            <Text>Stateless persons {this.state.countryStats.stateless_persons}</Text>
            <Text>Others {this.state.countryStats.others_of_concern}</Text>
          </View>
        </View>
        <View style={styles.countryStatsDataContainer}>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#979797', padding: 8}}>
            <Text style={styles.countryStatsHeading1}>Countries of origin</Text>
            <Text style={styles.countryStatsHeading2}>Total persons per country of origin</Text>
          </View>
          <ListView
            style={{padding: 5}}
            initialListSize={6}
            scrollEnabled={false}
            dataSource={this.state.topCountriesOfOrigin}
            enableEmptySections={true}
            renderRow={this.renderTopCountriesOfOrigin.bind(this)}
            renderSeparator={this.renderSeparator(this.state.topCountriesOfOrigin).bind(this)}
          ></ListView>
          <View style={{borderTopWidth: 1, borderTopColor: '#979797'}}>
            <TouchableHighlight onPress={() => console.log(1)}>
              <View style={styles.countryListItem}>
                <Text style={styles.countryListText}>Countries of origin</Text>
                <Text style={[styles.countryListText, {alignSelf: 'flex-end', flex: 1, textAlign: 'right'}]}>{'>'}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.countryStatsDataContainer}>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#979797', flex: 1, flexDirection: 'row'}}>
            <View>
              <Text style={styles.countryStatsHeading1}>Resettlement</Text>
              <Text style={styles.countryStatsHeading2}>Persons resettled to other countries</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.countryStatsHeading1, {textAlign: 'right', padding: 4, fontSize: 26}]}>
                {this.state.resettlementTotal}
              </Text>
            </View>
          </View>
          <ListView
            style={{padding: 5}}
            initialListSize={6}
            scrollEnabled={false}
            dataSource={this.state.topCountriesResettlement}
            enableEmptySections={true}
            renderRow={this.renderTopCountriesResettlement.bind(this)}
            renderSeparator={this.renderSeparator(this.state.topCountriesResettlement).bind(this)}
          ></ListView>
          <View style={{borderTopWidth: 1, borderTopColor: '#979797'}}>
            <TouchableHighlight onPress={() => console.log(1)}>
              <View style={styles.countryListItem}>
                <Text style={styles.countryListText}>Resettlement</Text>
                <Text style={[styles.countryListText, {alignSelf: 'flex-end', flex: 1, textAlign: 'right'}]}>{'>'}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
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
    var urlWithoutPage = PERSONS_OF_CONCERN_URL + year + this.props.year + cor + this.props.countryId + coo + page;
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
            personsOfConcern.total += this.nanFilter(value.total_population);
            personsOfConcern.refugees += this.nanFilter(value.refugees) +
              this.nanFilter(value.people_in_refugee_like_situations);
            personsOfConcern.asylum_seekers += this.nanFilter(value.asylum_seekers);
            personsOfConcern.idps += this.nanFilter(value.idps) +
              this.nanFilter(value.people_in_idp_like_situations);
            personsOfConcern.returnees += this.nanFilter(value.returned_idps) +
              this.nanFilter(value.returned_refugees);
            personsOfConcern.stateless_persons += this.nanFilter(value.stateless_persons);
            personsOfConcern.others_of_concern += this.nanFilter(value.others_of_concern);
          });

          countriesData.sort((a, b) => {
            return this.nanFilter(b.total_population) - this.nanFilter(a.total_population);
          });

          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.state.topCountriesOfOrigin = ds.cloneWithRows(countriesData.slice(0,6));
          this.state.countryStats = personsOfConcern;

          var urlWithoutPage =
            RESETTLEMENT_URL + year + this.props.year + coa + this.props.countryId + coo + '&coo=STA'+ page;

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
                resettlementData.forEach((value) => resettlementTotal += this.nanFilter(value.value));

                resettlementData.sort((a, b) => {
                  return this.nanFilter(b.value) - this.nanFilter(a.value);
                });

                var resettlementDataSOurce = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.state.topCountriesResettlement = resettlementDataSOurce.cloneWithRows(resettlementData.slice(0,6));
                this.props.parent.setState({leftButtonDisabled: false, rightButtonDisabled: false});
                this.setState({resettlementTotal});
              });

            });

          }).done();

        });
      });
    }).done();
  }

  nanFilter (value) {
    if (isNaN(value)) {
      return 0;
    }
    return value;
  }

}

module.exports = CountryStatsByYear;
