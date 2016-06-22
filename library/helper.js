import { Platform, Alert } from 'react-native';

var helper = {

  nanFilter: (value) => {
    if (isNaN(value) || value === null) {
      return 0;
    }
    return value;
  },

  rowHasChanged: (row1, row2) => row1 !== row2,

  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,

  formatNumber: (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),

  personsOfConcernKeys: {
    'Refugees': 'refugees',
    'Asylum-seekers': 'asylum_seekers',
    'IDP\'s': 'idps',
    'Returnees': 'returnees',
    'Stateless persons': 'stateless_persons',
    'Others': 'others_of_concern',
  },

  getHexisLink: () => {
    return 'http://hexis.hr/en/?ref=popstats';
  },

  isAndroid: () => Platform.OS === 'android',

  isIOS: () => Platform.OS === 'ios',

  alertNetworkError: () => {
    Alert.alert('Network error', 'Can\'t connect to network, please enable network access and try again.');
  },

};

module.exports = helper;
