var r = n('./73'), o = n('./61'), a = n('./137'), i = n('./28');
e.exports = function (e, t, n) {
  if (!i(n))
    return !1;
  var l = typeof t;
  return !!('number' == l ? o(n) && a(t, n.length) : 'string' == l && t in n) && r(n[t], e);
};