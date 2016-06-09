var helper = {

  nanFilter: (value) => {
    if (isNaN(value)) {
      return 0;
    }
    return value;
  },

  rowHasChanged: (row1, row2) => row1 !== row2


};

module.exports = helper;
