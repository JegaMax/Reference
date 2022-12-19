var r = n('./31'), o = n('./173'), a = n('./32'), i = n('./82'), l = Object.defineProperty;
t.f = r ? l : function (e, t, n) {
  if (a(e), t = i(t, !0), a(n), o)
    try {
      return l(e, t, n);
    } catch (e) {
    }
  if ('get' in n || 'set' in n)
    throw TypeError('Accessors not supported');
  return 'value' in n && (e[t] = n.value), e;
};