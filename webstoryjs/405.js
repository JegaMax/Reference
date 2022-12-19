'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.mergeClasses = void 0;
var r = i(n('./135')), o = i(n('./406')), a = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  };
function i(e) {
  return e && e.__esModule ? e : { default: e };
}
var l = t.mergeClasses = function (e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n = e.default && (0, o.default)(e.default) || {};
  return t.map(function (t) {
    var o = e[t];
    return o && (0, r.default)(o, function (e, t) {
      n[t] || (n[t] = {}), n[t] = a({}, n[t], o[t]);
    }), t;
  }), n;
};
t.default = l;