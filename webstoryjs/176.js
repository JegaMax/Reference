'use strict';
var r = n('./60'), o = n('./181'), a = n('./87'), i = n('./70'), l = n('./68'), s = n('./35'), c = n('./49'), u = n('./19'), f = n('./83'), d = n('./69'), p = n('./182'), h = p.IteratorPrototype, g = p.BUGGY_SAFARI_ITERATORS, m = u('iterator'), b = 'keys', v = 'values', y = 'entries', C = function () {
    return this;
  };
e.exports = function (e, t, n, u, p, w, x) {
  o(n, t, u);
  var E, _, O, S = function (e) {
      if (e === p && I)
        return I;
      if (!g && e in j)
        return j[e];
      switch (e) {
      case b:
      case v:
      case y:
        return function () {
          return new n(this, e);
        };
      }
      return function () {
        return new n(this);
      };
    }, k = t + ' Iterator', A = !1, j = e.prototype, M = j[m] || j['@@iterator'] || p && j[p], I = !g && M || S(p), T = 'Array' == t && j.entries || M;
  if (T && (E = a(T.call(new e())), h !== Object.prototype && E.next && (f || a(E) === h || (i ? i(E, h) : 'function' != typeof E[m] && s(E, m, C)), l(E, k, !0, !0), f && (d[k] = C))), p == v && M && M.name !== v && (A = !0, I = function () {
      return M.call(this);
    }), f && !x || j[m] === I || s(j, m, I), d[t] = I, p)
    if (_ = {
        values: S(v),
        keys: w ? I : S(b),
        entries: S(y)
      }, x)
      for (O in _)
        (g || A || !(O in j)) && c(j, O, _[O]);
    else
      r({
        target: t,
        proto: !0,
        forced: g || A
      }, _);
  return _;
};