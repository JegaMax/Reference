var r = n('./203'), o = Object.prototype.hasOwnProperty;
e.exports = function (e, t, n, a, i, l) {
  var s = 1 & n, c = r(e), u = c.length;
  if (u != r(t).length && !s)
    return !1;
  for (var f = u; f--;) {
    var d = c[f];
    if (!(s ? d in t : o.call(t, d)))
      return !1;
  }
  var p = l.get(e);
  if (p && l.get(t))
    return p == t;
  var h = !0;
  l.set(e, t), l.set(t, e);
  for (var g = s; ++f < u;) {
    var m = e[d = c[f]], b = t[d];
    if (a)
      var v = s ? a(b, m, d, t, e, l) : a(m, b, d, e, t, l);
    if (!(void 0 === v ? m === b || i(m, b, n, a, l) : v)) {
      h = !1;
      break;
    }
    g || (g = 'constructor' == d);
  }
  if (h && !g) {
    var y = e.constructor, C = t.constructor;
    y == C || !('constructor' in e) || !('constructor' in t) || 'function' == typeof y && y instanceof y && 'function' == typeof C && C instanceof C || (h = !1);
  }
  return l.delete(e), l.delete(t), h;
};