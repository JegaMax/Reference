'use strict';
var r = n('./31'), o = n('./27'), a = n('./185'), i = n('./180'), l = n('./177'), s = n('./50'), c = n('./130'), u = Object.assign, f = Object.defineProperty;
e.exports = !u || o(function () {
  if (r && 1 !== u({ b: 1 }, u(f({}, 'a', {
      enumerable: !0,
      get: function () {
        f(this, 'b', {
          value: 3,
          enumerable: !1
        });
      }
    }), { b: 2 })).b)
    return !0;
  var e = {}, t = {}, n = Symbol(), o = 'abcdefghijklmnopqrst';
  return e[n] = 7, o.split('').forEach(function (e) {
    t[e] = e;
  }), 7 != u({}, e)[n] || a(u({}, t)).join('') != o;
}) ? function (e, t) {
  for (var n = s(e), o = arguments.length, u = 1, f = i.f, d = l.f; o > u;)
    for (var p, h = c(arguments[u++]), g = f ? a(h).concat(f(h)) : a(h), m = g.length, b = 0; m > b;)
      p = g[b++], r && !d.call(h, p) || (n[p] = h[p]);
  return n;
} : u;