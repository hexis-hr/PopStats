import helper from '../library/helper';

const PERSONS_OF_CONCERN_URL = 'http://api.hexis.hr/popstats/persons_of_concern';
const DEMOGRAPHICS_URL = 'http://api.hexis.hr/popstats/demographics';
const ASYLUM_SEEKERS_URL = 'http://api.hexis.hr/popstats/asylum_seekers';
const YEARS_URL = 'http://api.hexis.hr/popstats/available_years';

var fetcher = {

  personsOfConcern: function (year, countryId) {
    return new Promise((resolve, reject) => {
      var personsOfConcern = {
        total: 0,
        refugees: 0,
        asylum_seekers: 0,
        idps: 0,
        returnees: 0,
        stateless_persons: 0,
        others_of_concern: 0,
      };
      var url = PERSONS_OF_CONCERN_URL + '/year/' + year + '/country/' + countryId;
      fetch(url).then((res) => res.json()).catch(() => { reject(Error('Network error')); }).then((res) => {
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
        resolve({
          personsOfConcern,
          countriesData: res.data,
        });

      }).done();
    });
  },

  demographics: (year, countryId) => {
    var url = DEMOGRAPHICS_URL + '/year/' + year + '/country/' + countryId;
    return new Promise((resolve, reject) => {
      fetch(url).then((res) => res.json()).catch(() => { reject(Error('Network error')); }).then((res) => {
        resolve([res]);
      }).done();
    });
  },

  asylumSeekers: (year, countryId) => {
    var url = ASYLUM_SEEKERS_URL + '/year/' + year + '/country/' + countryId;
    return new Promise((resolve, reject) => {
      fetch(url).then((res) => res.json()).catch(() => { reject(Error('Network error')); }).then((res) => {
        resolve([res]);
      }).done();
    });
  },

  availableYears: () => {
    return new Promise((resolve, reject) => {
      fetch(YEARS_URL).
        then((res) => res.json()).
        catch(() => { reject(Error('Network error')); }).
        then((res) => { resolve(res); }).
        done();
    });
  }

};

module.exports = fetcher;
