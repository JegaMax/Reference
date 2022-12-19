'use strict';
e.exports = function (e, t, n, r) {
  if (e.size) {
    var o = 0;
    e.reduce(function (e, a, i) {
      return t(e, a) || (n(e) && r(o, i), o = i), a;
    }), n && r(o, e.count());
  }
};