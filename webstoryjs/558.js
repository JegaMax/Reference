'use strict';
var r = /\r\n?|\n/g;
e.exports = function (e) {
  return e.split(r);
};