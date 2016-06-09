import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#1074BA',
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
  },

  navigationBar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },

  countryStatsDataContainer: {
    backgroundColor: 'white',
    margin: 8,
    borderWidth: 1,
    borderColor: '#979797',
    padding: 0,
  },

  countryStatsHeading1: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  countryStatsHeading2: {
    color: '#979797',
    fontSize: 14,
    marginLeft: 5,
  },

  countryListItem: {
    padding: 12,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#979797',
    borderBottomWidth: 1
  },
  countryListText: {
    color: '#1C7CBD',
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: 'white',
    margin: 8,
    padding: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: '#1C7CBD',
    fontSize: 19,
    fontWeight: 'bold',
  },

});

module.exports = styles;
