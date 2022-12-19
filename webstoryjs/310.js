'use strict';
var r = 2147483647, o = /[^\0-\u007E]/, a = /[.\u3002\uFF0E\uFF61]/g, i = 'Overflow: input needs wider integers to process', l = Math.floor, s = String.fromCharCode, c = function (e) {
    return e + 22 + 75 * (e < 26);
  }, u = function (e, t, n) {
    var r = 0;
    for (e = n ? l(e / 700) : e >> 1, e += l(e / t); e > 455; r += 36)
      e = l(e / 35);
    return l(r + 36 * e / (e + 38));
  }, f = function (e) {
    var t, n, o = [], a = (e = function (e) {
        for (var t = [], n = 0, r = e.length; n < r;) {
          var o = e.charCodeAt(n++);
          if (o >= 55296 && o <= 56319 && n < r) {
            var a = e.charCodeAt(n++);
            56320 == (64512 & a) ? t.push(((1023 & o) << 10) + (1023 & a) + 65536) : (t.push(o), n--);
          } else
            t.push(o);
        }
        return t;
      }(e)).length, f = 128, d = 0, p = 72;
    for (t = 0; t < e.length; t++)
      (n = e[t]) < 128 && o.push(s(n));
    var h = o.length, g = h;
    for (h && o.push('-'); g < a;) {
      var m = r;
      for (t = 0; t < e.length; t++)
        (n = e[t]) >= f && n < m && (m = n);
      var b = g + 1;
      if (m - f > l((r - d) / b))
        throw RangeError(i);
      for (d += (m - f) * b, f = m, t = 0; t < e.length; t++) {
        if ((n = e[t]) < f && ++d > r)
          throw RangeError(i);
        if (n == f) {
          for (var v = d, y = 36;; y += 36) {
            var C = y <= p ? 1 : y >= p + 26 ? 26 : y - p;
            if (v < C)
              break;
            var w = v - C, x = 36 - C;
            o.push(s(c(C + w % x))), v = l(w / x);
          }
          o.push(s(c(v))), p = u(d, b, g == h), d = 0, ++g;
        }
      }
      ++d, ++f;
    }
    return o.join('');
  };
e.exports = function (e) {
  var t, n, r = [], i = e.toLowerCase().replace(a, '.').split('.');
  for (t = 0; t < i.length; t++)
    n = i[t], r.push(o.test(n) ? 'xn--' + f(n) : n);
  return r.join('.');
};