'use strict';
var r = /-(.)/g;
e.exports = function (e) {
  return e.replace(r, function (e, t) {
    return t.toUpperCase();
  });
};