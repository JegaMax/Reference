'use strict';
var r = {
  stringify: function (e) {
    return '_' + String(e);
  },
  unstringify: function (e) {
    return e.slice(1);
  }
};
e.exports = r;