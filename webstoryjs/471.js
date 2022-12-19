var r = n('./90'), o = n('./130'), a = n('./50'), i = n('./41'), l = n('./472'), s = [].push, c = function (e) {
    var t = 1 == e, n = 2 == e, c = 3 == e, u = 4 == e, f = 6 == e, d = 5 == e || f;
    return function (p, h, g, m) {
      for (var b, v, y = a(p), C = o(y), w = r(h, g, 3), x = i(C.length), E = 0, _ = m || l, O = t ? _(p, x) : n ? _(p, 0) : void 0; x > E; E++)
        if ((d || E in C) && (v = w(b = C[E], E, y), e))
          if (t)
            O[E] = v;
          else if (v)
            switch (e) {
            case 3:
              return !0;
            case 5:
              return b;
            case 6:
              return E;
            case 2:
              s.call(O, b);
            }
          else if (u)
            return !1;
      return f ? -1 : c || u ? u : O;
    };
  };
e.exports = {
  forEach: c(0),
  map: c(1),
  filter: c(2),
  some: c(3),
  every: c(4),
  find: c(5),
  findIndex: c(6)
};