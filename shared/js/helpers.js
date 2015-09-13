'use strict';

var numeral = require('numeral');
var moment = require('moment');

exports.handlebarsHelpers = {
  number: function(num) {
    return numeral(num).format('0,0');
  },
  breaklines: function(str) {
    return str
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n/g, '<br/>');
  },
  relativeTime: function(str) {
    return moment(str).fromNow();
  }
};
