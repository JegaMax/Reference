'use strict';
var r = new RegExp('\r', 'g');
e.exports = function (e) {
  return e.replace(r, '');
};