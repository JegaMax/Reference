var r = n('./210'), o = n('./103');
e.exports = function (e, t) {
  for (var n = 0, a = (t = r(t, e)).length; null != e && n < a;)
    e = e[o(t[n++])];
  return n && n == a ? e : void 0;
};