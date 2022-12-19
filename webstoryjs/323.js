'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.default = function (e) {
  return function (t) {
    var n = t || {}, r = n.width ? String(n.width) : e.defaultWidth;
    return e.formats[r] || e.formats[e.defaultWidth];
  };
}, e.exports = t.default;