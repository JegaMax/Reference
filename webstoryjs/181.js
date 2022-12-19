'use strict';
var r = n('./182').IteratorPrototype, o = n('./88'), a = n('./59'), i = n('./68'), l = n('./69'), s = function () {
    return this;
  };
e.exports = function (e, t, n) {
  var c = t + ' Iterator';
  return e.prototype = o(r, { next: a(1, n) }), i(e, c, !1, !0), l[c] = s, e;
};