'use strict';
var r = n('./86'), o = n('./36'), a = n('./19'), i = n('./31'), l = a('species');
e.exports = function (e) {
  var t = r(e), n = o.f;
  i && t && !t[l] && n(t, l, {
    configurable: !0,
    get: function () {
      return this;
    }
  });
};