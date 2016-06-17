import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ListView,
  TouchableHighlight,
  Modal,
  Linking,
} from 'react-native';

import style from '../styles/style';
import helper from '../library/helper';

var flex = 1;

class Disclaimer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      modalOn: false,
    }
  }

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalOn}
          onRequestClose={() => { this.state.modalOn = false; }}
        >
          <View style={{height: 25}}></View>
          <View style={{backgroundColor: 'white', flex: 1}}>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableHighlight
                onPress={() => {
                  this.setState({modalOn: false});
                }}
              >
                <Text style={{color: '#898E91', padding: 16, fontWeight: 'bold', fontSize: 18}}>X</Text>
              </TouchableHighlight>
            </View>
            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Disclaimer</Text>
            </View>
            <View style={{paddingHorizontal: 20, paddingTop: 20}}>
              <Text style={style.disclaimer_text}>Author of this mobile application is Hexis j.d.o.o..{'\n'}</Text>
              <Text style={style.disclaimer_text}>
                All of the data used in this mobile application is property of United Nations High Commissioner
                for Refugees, and is publicly available on popstats.unhcr.org.{'\n'}
              </Text>
              <Text style={style.disclaimer_text}>
                Hexis j.d.o.o. is not responsible for authenticity and veracity of the data.{'\n'}
              </Text>
              <Text style={style.disclaimer_text}>
                For all information and inquiries related to population statistics please visit popstats.unhrcr.org.
                {'\n'}
              </Text>
              <Text style={style.disclaimer_text}>
                Developed by Hexis j.d.o.o., for more details please visit www.hexis.hr.{'\n'}
              </Text>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          style={{flex, margin: 8}}
          onPress={() => {
            this.setState({modalOn: true});
          }}
        >
          <Text style={style.transparentButton}>Disclaimer</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{flex, margin: 8}}
          onPress={() => {
            Linking.openURL(helper.getHexisLink());
          }}
        >
          <Text
            style={style.transparentButton}
          >Made by Hexis</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

module.exports = Disclaimer;
