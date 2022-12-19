'use strict';
Object.defineProperty(t, '__esModule', { value: !0 });
var r, o = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, a = n('./0'), i = (r = a) && r.__esModule ? r : { default: r };
t.default = function (e) {
  var t = e.fill, n = void 0 === t ? 'currentColor' : t, r = e.width, a = void 0 === r ? 24 : r, l = e.height, s = void 0 === l ? 24 : l, c = e.style, u = void 0 === c ? {} : c, f = function (e, t) {
      var n = {};
      for (var r in e)
        t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
      return n;
    }(e, [
      'fill',
      'width',
      'height',
      'style'
    ]);
  return i.default.createElement('svg', o({
    viewBox: '0 0 24 24',
    style: o({
      fill: n,
      width: a,
      height: s
    }, u)
  }, f), i.default.createElement('path', { d: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z' }));
};