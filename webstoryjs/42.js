'use strict';
var r = '-', o = {
    encode: function (e, t, n) {
      return e + r + t + r + n;
    },
    decode: function (e) {
      var t = e.split(r).reverse(), n = t[0], o = t[1];
      return {
        blockKey: t.slice(2).reverse().join(r),
        decoratorKey: parseInt(o, 10),
        leafKey: parseInt(n, 10)
      };
    }
  };
e.exports = o;