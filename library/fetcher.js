import helper from '../library/helper';

const POPDATA_ORIGIN_URL = 'http://popdata.unhcr.org/api/stats/origin.json';
const RESETTLEMENT_URL = 'http://popdata.unhcr.org/api/stats/resettlement.json?'
const PERSONS_OF_CONCERN_URL = 'http://popdata.unhcr.org/api/stats/persons_of_concern.json?';

var coa = '&coa=';
var yearKey = 'year=';
var cor = '&cor=';
var coo = '&coo=AFG&coo=ALB&coo=DZA&coo=AND&coo=AGO&coo=AIA&coo=ATG&coo=ARG&coo=ARM&coo=ABW&coo=AUS&coo=AUT&coo=AZE&coo=BHS&coo=BHR&coo=BGD&coo=BRB&coo=BLR&coo=BEL&coo=BLZ&coo=BEN&coo=BMU&coo=BTN&coo=BOL&coo=BIH&coo=BWA&coo=BRA&coo=VGB&coo=BRN&coo=BGR&coo=BFA&coo=BDI&coo=CPV&coo=KHM&coo=CMR&coo=CAN&coo=CYM&coo=CAF&coo=TCD&coo=CHL&coo=CHN&coo=HKG&coo=MAC&coo=COL&coo=COM&coo=COG&coo=COK&coo=CRI&coo=HRV&coo=CUB&coo=CUW&coo=CYP&coo=CZE&coo=CIV&coo=PRK&coo=COD&coo=DNK&coo=DJI&coo=DMA&coo=DOM&coo=ECU&coo=EGY&coo=SLV&coo=GNQ&coo=ERI&coo=EST&coo=ETH&coo=FJI&coo=FIN&coo=FRA&coo=GUF&coo=PYF&coo=GAB&coo=GMB&coo=GEO&coo=DEU&coo=GHA&coo=GIB&coo=GRC&coo=GRD&coo=GLP&coo=GTM&coo=GIN&coo=GNB&coo=GUY&coo=HTI&coo=VAT&coo=HND&coo=HUN&coo=ISL&coo=IND&coo=IDN&coo=IRN&coo=IRQ&coo=IRL&coo=ISR&coo=ITA&coo=JAM&coo=JPN&coo=JOR&coo=KAZ&coo=KEN&coo=KIR&coo=KWT&coo=KGZ&coo=LAO&coo=LVA&coo=LBN&coo=LSO&coo=LBR&coo=LBY&coo=LIE&coo=LTU&coo=LUX&coo=MDG&coo=MWI&coo=MYS&coo=MDV&coo=MLI&coo=MLT&coo=MHL&coo=MTQ&coo=MRT&coo=MUS&coo=MEX&coo=FSM&coo=MCO&coo=MNG&coo=MNE&coo=MAR&coo=MOZ&coo=MMR&coo=NAM&coo=NRU&coo=NPL&coo=NLD&coo=NCL&coo=NZL&coo=NIC&coo=NER&coo=NGA&coo=NIU&coo=NFK&coo=NOR&coo=OMN&coo=PAK&coo=PLW&coo=PSE&coo=PAN&coo=PNG&coo=PRY&coo=PER&coo=PHL&coo=POL&coo=PRT&coo=PRI&coo=QAT&coo=KOR&coo=MDA&coo=ROU&coo=RUS&coo=RWA&coo=KNA&coo=LCA&coo=VCT&coo=WSM&coo=SMR&coo=STP&coo=SAU&coo=SEN&coo=SRB&coo=SYC&coo=SLE&coo=SGP&coo=SVK&coo=SVN&coo=SLB&coo=SOM&coo=ZAF&coo=SSD&coo=ESP&coo=LKA&coo=XXA&coo=SDN&coo=SUR&coo=SWZ&coo=SWE&coo=CHE&coo=SYR&coo=TJK&coo=THA&coo=MKD&coo=TIB&coo=TLS&coo=TGO&coo=TON&coo=TTO&coo=TUN&coo=TUR&coo=TKM&coo=TCA&coo=TUV&coo=UGA&coo=UKR&coo=ARE&coo=GBR&coo=TZA&coo=USA&coo=URY&coo=UZB&coo=VUT&coo=XXC&coo=VEN&coo=VNM&coo=WLF&coo=ESH&coo=YEM&coo=ZMB&coo=ZWE';
var page = '&page=';

const RESULTS_PER_PAGE = 50;


var fetcher = {

  personsOfConcern: function (year, countryId) {

    return new Promise((resolve, reject) => {

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

      var urlWithoutPage = PERSONS_OF_CONCERN_URL + yearKey + year + cor + countryId + coo + page;
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

            resolve({
              personsOfConcern,
              countriesData,
            });

          });
        });
      }).done();
    });

  },

};

module.exports = fetcher;
