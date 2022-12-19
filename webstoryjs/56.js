'use strict';
var r = n('./9'), o = /[\uD800-\uDFFF]/;
function a(e) {
  return 55296 <= e && e <= 57343;
}
function i(e) {
  return o.test(e);
}
function l(e, t) {
  return 1 + a(e.charCodeAt(t));
}
function s(e, t, n) {
  if (t = t || 0, n = void 0 === n ? 1 / 0 : n || 0, !i(e))
    return e.substr(t, n);
  var r = e.length;
  if (r <= 0 || t > r || n <= 0)
    return '';
  var o = 0;
  if (t > 0) {
    for (; t > 0 && o < r; t--)
      o += l(e, o);
    if (o >= r)
      return '';
  } else if (t < 0) {
    for (o = r; t < 0 && 0 < o; t++)
      o -= l(e, o - 1);
    o < 0 && (o = 0);
  }
  var a = r;
  if (n < r)
    for (a = o; n > 0 && a < r; n--)
      a += l(e, a);
  return e.substring(o, a);
}
var c = {
  getCodePoints: function (e) {
    for (var t = [], n = 0; n < e.length; n += l(e, n))
      t.push(e.codePointAt(n));
    return t;
  },
  getUTF16Length: l,
  hasSurrogateUnit: i,
  isCodeUnitInSurrogateRange: a,
  isSurrogatePair: function (e, t) {
    if (0 <= t && t < e.length || r(!1), t + 1 === e.length)
      return !1;
    var n = e.charCodeAt(t), o = e.charCodeAt(t + 1);
    return 55296 <= n && n <= 56319 && 56320 <= o && o <= 57343;
  },
  strlen: function (e) {
    if (!i(e))
      return e.length;
    for (var t = 0, n = 0; n < e.length; n += l(e, n))
      t++;
    return t;
  },
  substring: function (e, t, n) {
    (t = t || 0) < 0 && (t = 0), (n = void 0 === n ? 1 / 0 : n || 0) < 0 && (n = 0);
    var r = Math.abs(n - t);
    return s(e, t = t < n ? t : n, r);
  },
  substr: s
};
e.exports = c;