import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Navigator,
  ListView,
  Modal,
  Picker,
  Image,
} from 'react-native';

import style from '../styles/style';
import NavigatorButton from './NavigatorButton';

const MIN_YEAR = 1951;
var flex = 1;

class YearNavigator extends Component {

  constructor (props) {
    super(props);

    this.state = {
      displayedYear: null,
      displayedPicker: false,
    };
    this.state.displayedYear = this.props.initialRoute.year;
    var LeftButtonPress = (nav) => {
      nav.replace({year: --this.props.root.state.year});
      this.state.displayedYear = this.props.root.state.year;
    };
    var RightButtonPress = (nav) => {
      nav.replace({year: ++this.props.root.state.year});
      this.state.displayedYear = this.props.root.state.year;
    };

    var LeftButton = (route, nav, index, navState) => {
      if (this.props.root.state.year > this.props.root.state.minYear) {
        return (
          <NavigatorButton
            textStyle={style.nestedNavButtonText}
            buttonStyle={style.nestedNavButton}
            leftImage={require('../img/navigation/arrowLeft.png')}
            onPress={() => LeftButtonPress(nav)}
          />
        );
      }
    };

    var RightButton = (route, nav, index, navState) => {
      if (this.props.root.state.year < this.props.root.state.maxYear) {
        return (
          <NavigatorButton
            textStyle={style.nestedNavButtonText}
            buttonStyle={style.nestedNavButton}
            rightImage={require('../img/navigation/arrowRight.png')}
            onPress={() => { RightButtonPress(nav); }}
          />
        );
      }
    };

    var Title = (route, nav, index, navState) => {
      return (
        <View style={{flex, justifyContent: 'center'}}>
          <TouchableHighlight
            style={{flex: 1}}
            onPress={() => {
              this.setState({displayedPicker: true});
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#7998AC',
                padding: 6,
                flex: 1,
                marginVertical: 4,
              }}
            >
              <Text style={style.nestedNavTitleText}>{route.year} </Text>
              <Image source={require('../img/navigation/dropdownArrow.png')} />
            </View>
          </TouchableHighlight>
          <Modal
            transparent={true}
            visible={this.state.displayedPicker}
            onRequestClose={() => { this.state.displayedPicker = false; }}
          >
            <View style={{backgroundColor: 'white'}}>
              <View style={{alignItems: 'flex-end'}}>
                <TouchableHighlight
                  onPress={() => {
                  this.setState({displayedPicker: false});
                }}
                >
                  <Text style={{color: '#898E91', padding: 16, fontWeight: 'bold', fontSize: 18}}>X</Text>
                </TouchableHighlight>
              </View>
              <View>
                <Text style={{fontSize: 16, textAlign: 'center'}}>Select a year</Text>
                <Picker
                  selectedValue={this.state.displayedYear.toString()}
                  onValueChange={(year) => {
                    year = parseInt(year);
                    this.props.root.state.year = year;
                    this.setState({year, displayedPicker: false});
                  }}
                >
                  {this.props.root.state.availableYears.map((year) => {
                    year = year.toString();
                    return <Picker.Item label={year} value={year} key={year} />;
                  })}
                </Picker>
              </View>
              <View style={{flex: 1}}></View>
            </View>
          </Modal>
        </View>
      );
    };

    this.navigationBar = {LeftButton, RightButton, Title};

  }

  renderNavigationBar () {
    return (<Navigator.NavigationBar routeMapper={this.navigationBar} style={style.nestedNavBar}/>);
  }

  render() {
    if (this.state.displayedYear !== this.props.root.state.year) {
      this.state.displayedYear = this.props.root.state.year;
      setTimeout(() => this.state.nav.replace({year: this.props.root.state.year}));
    }
    return (
      <Navigator
        ref={(ref) => this.state.nav = ref}
        style={{flex}}
        initialRoute={this.props.initialRoute}
        renderScene={this.props.renderScene}
        navigationBar={this.renderNavigationBar()}
      />
    );
  }

}

module.exports = YearNavigator;
