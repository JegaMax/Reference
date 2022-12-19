var r = n('./96'), o = n('./200');
e.exports = function (e, t, n, a) {
  var i = n.length, l = i, s = !a;
  if (null == e)
    return !l;
  for (e = Object(e); i--;) {
    var c = n[i];
    if (s && c[2] ? c[1] !== e[c[0]] : !(c[0] in e))
      return !1;
  }
  for (; ++i < l;) {
    var u = (c = n[i])[0], f = e[u], d = c[1];
    if (s && c[2]) {
      if (void 0 === f && !(u in e))
        return !1;
    } else {
      var p = new r();
      if (a)
        var h = a(f, d, u, e, t, p);
      if (!(void 0 === h ? o(d, f, 3, a, p) : h))
        return !1;
    }
  }
  return !0;
};