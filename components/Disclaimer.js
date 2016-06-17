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
