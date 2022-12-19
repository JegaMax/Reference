'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.flattenNames = void 0;
var r = l(n('./334')), o = l(n('./135')), a = l(n('./197')), i = l(n('./344'));
function l(e) {
  return e && e.__esModule ? e : { default: e };
}
var s = t.flattenNames = function e() {
  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = [];
  return (0, i.default)(t, function (t) {
    Array.isArray(t) ? e(t).map(function (e) {
      return n.push(e);
    }) : (0, a.default)(t) ? (0, o.default)(t, function (e, t) {
      !0 === e && n.push(t), n.push(t + '-' + e);
    }) : (0, r.default)(t) && n.push(t);
  }), n;
};
t.default = s;