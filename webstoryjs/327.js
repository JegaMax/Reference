'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.default = function (e) {
  return function (t, n) {
    var r = String(t), o = n || {}, a = r.match(e.matchPattern);
    if (!a)
      return null;
    var i = a[0], l = r.match(e.parsePattern);
    if (!l)
      return null;
    var s = e.valueCallback ? e.valueCallback(l[0]) : l[0];
    return {
      value: s = o.valueCallback ? o.valueCallback(s) : s,
      rest: r.slice(i.length)
    };
  };
}, e.exports = t.default;