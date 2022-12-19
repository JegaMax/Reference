var r = n('./18'), o = n('./175'), a = n('./24'), i = n('./127'), l = n('./183'), s = n('./300'), c = o('wks'), u = r.Symbol, f = s ? u : u && u.withoutSetter || i;
e.exports = function (e) {
  return a(c, e) || (l && a(u, e) ? c[e] = u[e] : c[e] = f('Symbol.' + e)), c[e];
};