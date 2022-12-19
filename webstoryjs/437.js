var r = n('./96'), o = n('./220'), a = n('./193'), i = n('./438'), l = n('./28'), s = n('./104'), c = n('./221');
e.exports = function e(t, n, u, f, d) {
  t !== n && a(n, function (a, s) {
    if (d || (d = new r()), l(a))
      i(t, n, s, u, e, f, d);
    else {
      var p = f ? f(c(t, s), a, s + '', t, n, d) : void 0;
      void 0 === p && (p = a), o(t, s, p);
    }
  }, s);
};