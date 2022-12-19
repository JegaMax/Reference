var r = n('./18'), o = n('./129').f, a = n('./35'), i = n('./49'), l = n('./125'), s = n('./294'), c = n('./298');
e.exports = function (e, t) {
  var n, u, f, d, p, h = e.target, g = e.global, m = e.stat;
  if (n = g ? r : m ? r[h] || l(h, {}) : (r[h] || {}).prototype)
    for (u in t) {
      if (d = t[u], f = e.noTargetGet ? (p = o(n, u)) && p.value : n[u], !c(g ? u : h + (m ? '.' : '#') + u, e.forced) && void 0 !== f) {
        if (typeof d == typeof f)
          continue;
        s(d, f);
      }
      (e.sham || f && f.sham) && a(d, 'sham', !0), i(n, u, d, e);
    }
};