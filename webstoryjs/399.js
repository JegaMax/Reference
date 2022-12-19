var r = n('./210'), o = n('./136'), a = n('./25'), i = n('./137'), l = n('./139'), s = n('./103');
e.exports = function (e, t, n) {
  for (var c = -1, u = (t = r(t, e)).length, f = !1; ++c < u;) {
    var d = s(t[c]);
    if (!(f = null != e && n(e, d)))
      break;
    e = e[d];
  }
  return f || ++c != u ? f : !!(u = null == e ? 0 : e.length) && l(u) && i(d, u) && (a(e) || o(e));
};