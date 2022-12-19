var r = n('./375'), o = n('./378'), a = n('./379');
e.exports = function (e, t, n, i, l, s) {
  var c = 1 & n, u = e.length, f = t.length;
  if (u != f && !(c && f > u))
    return !1;
  var d = s.get(e);
  if (d && s.get(t))
    return d == t;
  var p = -1, h = !0, g = 2 & n ? new r() : void 0;
  for (s.set(e, t), s.set(t, e); ++p < u;) {
    var m = e[p], b = t[p];
    if (i)
      var v = c ? i(b, m, p, t, e, s) : i(m, b, p, e, t, s);
    if (void 0 !== v) {
      if (v)
        continue;
      h = !1;
      break;
    }
    if (g) {
      if (!o(t, function (e, t) {
          if (!a(g, t) && (m === e || l(m, e, n, i, s)))
            return g.push(t);
        })) {
        h = !1;
        break;
      }
    } else if (m !== b && !l(m, b, n, i, s)) {
      h = !1;
      break;
    }
  }
  return s.delete(e), s.delete(t), h;
};