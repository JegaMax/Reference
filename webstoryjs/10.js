'use strict';
n.d(t, 'a', function () {
  return FlagsProvider;
}), n.d(t, 'b', function () {
  return s;
}), n.d(t, 'c', function () {
  return l;
});
var r = n('./0');
function o() {
  return (o = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }).apply(this, arguments);
}
var a = Object(r.createContext)({});
function i(e) {
  return Array.isArray(e) ? Object.fromEntries(e.map(function (e) {
    return [
      e,
      !0
    ];
  })) : e;
}
function FlagsProvider(e) {
  var t, n, s = e.features, c = void 0 === s ? {} : s, u = e.children, f = l();
  return Object(r.createElement)(a.Provider, { value: (t = i(f), n = i(c), o({}, t, n)) }, u);
}
function l() {
  return Object(r.useContext)(a);
}
function s(e) {
  var t = l();
  return Array.isArray(t) ? t.includes(e) : 'boolean' == typeof t[e] ? t[e] : e.split('/').reduce(function (e, t) {
    return 'boolean' == typeof e ? e : void 0 !== e[t] && e[t];
  }, t);
}