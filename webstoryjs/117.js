'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.default = function (e) {
  return function (t, n) {
    var r, o = n || {};
    if ('formatting' === (o.context ? String(o.context) : 'standalone') && e.formattingValues) {
      var a = e.defaultFormattingWidth || e.defaultWidth, i = o.width ? String(o.width) : a;
      r = e.formattingValues[i] || e.formattingValues[a];
    } else {
      var l = e.defaultWidth, s = o.width ? String(o.width) : e.defaultWidth;
      r = e.values[s] || e.values[l];
    }
    return r[e.argumentCallback ? e.argumentCallback(t) : t];
  };
}, e.exports = t.default;