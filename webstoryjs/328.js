'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.default = function (e) {
  return function (t, n) {
    var r = String(t), o = n || {}, a = o.width, i = a && e.matchPatterns[a] || e.matchPatterns[e.defaultMatchWidth], l = r.match(i);
    if (!l)
      return null;
    var s, c = l[0], u = a && e.parsePatterns[a] || e.parsePatterns[e.defaultParseWidth];
    return s = '[object Array]' === Object.prototype.toString.call(u) ? function (e, t) {
      for (var n = 0; n < e.length; n++)
        if (t(e[n]))
          return n;
    }(u, function (e) {
      return e.test(c);
    }) : function (e, t) {
      for (var n in e)
        if (e.hasOwnProperty(n) && t(e[n]))
          return n;
    }(u, function (e) {
      return e.test(c);
    }), s = e.valueCallback ? e.valueCallback(s) : s, {
      value: s = o.valueCallback ? o.valueCallback(s) : s,
      rest: r.slice(c.length)
    };
  };
}, e.exports = t.default;