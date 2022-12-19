var r = n('./385'), o = n('./145'), a = n('./386'), i = n('./387'), l = n('./388'), s = n('./51'), c = n('./199'), u = '[object Map]', f = '[object Promise]', d = '[object Set]', p = '[object WeakMap]', h = '[object DataView]', g = c(r), m = c(o), b = c(a), v = c(i), y = c(l), C = s;
(r && C(new r(new ArrayBuffer(1))) != h || o && C(new o()) != u || a && C(a.resolve()) != f || i && C(new i()) != d || l && C(new l()) != p) && (C = function (e) {
  var t = s(e), n = '[object Object]' == t ? e.constructor : void 0, r = n ? c(n) : '';
  if (r)
    switch (r) {
    case g:
      return h;
    case m:
      return u;
    case b:
      return f;
    case v:
      return d;
    case y:
      return p;
    }
  return t;
}), e.exports = C;