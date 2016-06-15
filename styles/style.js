import { StyleSheet } from 'react-native';

var mainBlue = '#0072BC';
var lightBlue = '#D6E8F0';
var shadowButton = '#517889';

var backgroundLight = '#EFF5F9';

var backgroundGrey = '#F2F2F2';
var textGrey = '#898E91';

var maleColor = '#389DC7';

var femaleColor = '#EF5C86';

var flex = 1;

var style = StyleSheet.create({

  /**
   * UTIL
   */

  mainContainerWithNavigationBar: {
    marginTop: 64,
  },

  mainContainerWithNestedNavigationBar: {
    marginTop: 44,
    marginBottom: 49,
  },

  textBlue: {
    color: mainBlue,
  },

  textWhite: {
    color: 'white',
  },

  backgroundWhite: {
    backgroundColor: 'white',
  },

  backgroundBlue: {
    backgroundColor: mainBlue,
  },

  /**
   * HomeScreen
   */

  mainContainer: {
    flex: 1,
    backgroundColor: mainBlue,
  },

  whiteButton: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
  },

  blueButton: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: mainBlue,
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
  },

  whiteButtonText: {
    color: mainBlue,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  blueButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

  titleContainer: {
    marginBottom: 20,
  },

  titleText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: '200',
  },

  /**
   * Navigation NavigatorButton
   */

  mainNavBar: {
    backgroundColor: mainBlue,
  },

  mainNavBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainNavBarTitleText: {
    fontSize: 16,
    padding: 8,
    color: 'white'
  },

  mainNavBarButtonText: {
    fontSize: 20,
    padding: 15,
    fontWeight: 'bold',
    color: 'white'
  },

  flexRow: {
    flex,
    flexDirection: 'row',
  },

  /**
   * CountryListScreen
   */

  list: {
    backgroundColor: 'white',
  },

  listHeadingContainer: {
    backgroundColor: backgroundGrey,
  },

  listHeadingText: {
    color: textGrey,
    fontSize: 15,
    padding: 12.5,
  },

  listRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  listRowTouchable: {
    backgroundColor: 'white',
  },

  listRowText: {
    color: mainBlue,
    fontSize: 17,
    padding: 13.5,
    fontWeight: '600',
    flex: 1,
  },

  listRowGte: {
    color: textGrey,
    fontSize: 17,
    padding: 13.5,
    fontWeight: '600',
  },

  listSeparator: {
    backgroundColor: backgroundGrey,
    height: 1,
  },

  /**
   * CountryPopStats
   */

  lightBackground: {
    backgroundColor: backgroundLight
  },

  /**
   * PersonsOfConcernScreen
   */

  nestedNavBar: {
    backgroundColor: backgroundLight,
    top: -20,
  },

  nestedNavButton: {
    paddingHorizontal: 6,
  },

  nestedNavButtonText: {
    color: mainBlue,
  },

  nestedNavTitleText: {
    color: 'black',
    fontSize: 16,
  },

  /**
   * PersonsOfConcern
   */

  statisticsBlockContainer: {
    margin: 6,
    backgroundColor: 'white',
    shadowColor: mainBlue,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 0.4,
  },

  statisticsBlockHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 12,
    borderColor: backgroundGrey,
    flex: 1,
    justifyContent: 'center',
  },

  statisticsBlockHeaderMainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  statisticsBlockHeaderMiniTitle: {
    fontSize: 10,
    color: textGrey,
  },

  statisticsBlockHeaderTotal: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  statisticsBody: {
    flex: 1,
    flexDirection: 'row'
  },

  statisticsChart: {
    flex: 0,
    width: 125,
    height: 145,
    backgroundColor: 'white'
  },

  statisticsChartLegend: {
    flex: 1,
    justifyContent: 'center'
  },

  statisticsLegendCircle: {
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 100,
    width: 10,
    height: 10,
  },

  statisticsLegendText: {
    color: textGrey,
    fontSize: 14,
  },

  statisticsSeparator: {
    height: 1,
    backgroundColor: backgroundGrey,
  },

  countriesOfOriginTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 2,
  },

  countriesOfOriginText: {
    fontSize: 14,
    color: textGrey,
    paddingVertical: 2,
  },

  countriesOfOriginFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: backgroundGrey,
    flex: 1,
    backgroundColor: 'white',
  },

  /**
   * CountriesOfOrigin
   */

  countriesOfOriginContainer: {
    backgroundColor: 'white',
    padding: 8,
    marginBottom: 0,
  },

  countriesOfOriginHeader: {
    borderBottomWidth: 1,
    borderColor: backgroundGrey,
    paddingBottom: 6,
  },

  sortSwitchContainer: {
    flexDirection: 'row',
    marginVertical: 16,
  },

  sortByTotal: {
    flex,
    backgroundColor: mainBlue,
    borderWidth: 2,
    borderColor: mainBlue,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    alignItems: 'center',
    padding: 4,
  },

  sortByName: {
    flex,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: mainBlue,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    padding: 4,
  },

  sortByTotalSelected: {
    flex,
    backgroundColor: mainBlue,
    borderWidth: 2,
    borderColor: mainBlue,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    alignItems: 'center',
    padding: 4,
  },

  sortByNameSelected: {
    flex,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: mainBlue,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    padding: 4,
  },

  /**
   * Demographics
   */

  maleContainer: {
    height: 145,
    backgroundColor: maleColor,
    borderRightWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },

  femaleContainer: {
    height: 145,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: femaleColor,
  },

  demographicsTotalsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  maleSmallPercentage: {
    backgroundColor: maleColor,
    padding: 2,
    paddingRight: 6,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.4,
    position: 'absolute',
    top: 103,
    left: 2,
  },

  femaleSmallPercentage: {
    backgroundColor: femaleColor,
    padding: 2,
    paddingLeft: 6,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.4,
    position: 'absolute',
    top: 103,
    right: 2
  },

  demographicsStatContainer: {
    backgroundColor: 'white',
    padding: 10,
    shadowColor: mainBlue,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 0.4,
  },

  demographicsStatTitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 6,
    fontWeight: 'bold',
  },

  demographicsStatLabel: {
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: 'white',
    margin: 2,
    fontWeight: 'bold',
  },

  barContainer: {
    flex: 1,
    height: 19.5,
    marginVertical: 2,
    flexDirection: 'row'
  },

  maleBar: {
    backgroundColor: maleColor,
  },

  femaleBar: {
    backgroundColor: femaleColor,
  },

  demographicsPercentageText: {
    fontSize: 14,
    marginVertical: 3.25,
    color: textGrey,
  },

  /**
   * AsylumSeekers
   */

  asylumSeekersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  asylumSeekersTitleSmall: {
    fontSize: 14,
    color: textGrey,
  },

  asylumSeekersLine: {
    height: 1,
    backgroundColor: lightBlue,
    marginVertical: 8,
  },

  asylumSeekersCard: {
    marginBottom: 6,
    backgroundColor: 'white',
    shadowColor: mainBlue,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingBottom: 6,
  },

  asylumSeekersPadding: {
    padding: 6,
  }

});

module.exports = style;
