var r = n('./96'), o = n('./201'), a = n('./380'), i = n('./383'), l = n('./101'), s = n('./25'), c = n('./93'), u = n('./138'), f = '[object Arguments]', d = '[object Array]', p = '[object Object]', h = Object.prototype.hasOwnProperty;
e.exports = function (e, t, n, g, m, b) {
  var v = s(e), y = s(t), C = v ? d : l(e), w = y ? d : l(t), x = (C = C == f ? p : C) == p, E = (w = w == f ? p : w) == p, _ = C == w;
  if (_ && c(e)) {
    if (!c(t))
      return !1;
    v = !0, x = !1;
  }
  if (_ && !x)
    return b || (b = new r()), v || u(e) ? o(e, t, n, g, m, b) : a(e, t, C, n, g, m, b);
  if (!(1 & n)) {
    var O = x && h.call(e, '__wrapped__'), S = E && h.call(t, '__wrapped__');
    if (O || S) {
      var k = O ? e.value() : e, A = S ? t.value() : t;
      return b || (b = new r()), m(k, A, n, g, b);
    }
  }
  return !!_ && (b || (b = new r()), i(e, t, n, g, m, b));
};