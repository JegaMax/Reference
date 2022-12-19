'use strict';
var r = /([A-Z])/g;
e.exports = function (e) {
  return e.replace(r, '-$1').toLowerCase();
};