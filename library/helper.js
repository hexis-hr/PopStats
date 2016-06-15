var helper = {

  nanFilter: (value) => {
    if (isNaN(value) || value === null) {
      return 0;
    }
    return value;
  },

  rowHasChanged: (row1, row2) => row1 !== row2,

  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,

};

module.exports = helper;
