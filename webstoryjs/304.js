'use strict';
var r = n('./90'), o = n('./50'), a = n('./306'), i = n('./187'), l = n('./41'), s = n('./308'), c = n('./91');
e.exports = function (e) {
  var t, n, u, f, d, p, h = o(e), g = 'function' == typeof this ? this : Array, m = arguments.length, b = m > 1 ? arguments[1] : void 0, v = void 0 !== b, y = c(h), C = 0;
  if (v && (b = r(b, m > 2 ? arguments[2] : void 0, 2)), null == y || g == Array && i(y))
    for (n = new g(t = l(h.length)); t > C; C++)
      p = v ? b(h[C], C) : h[C], s(n, C, p);
  else
    for (d = (f = y.call(h)).next, n = new g(); !(u = d.call(f)).done; C++)
      p = v ? a(f, b, [
        u.value,
        C
      ], !0) : u.value, s(n, C, p);
  return n.length = C, n;
};