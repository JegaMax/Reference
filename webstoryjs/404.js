var r = n('./61');
e.exports = function (e, t) {
  return function (n, o) {
    if (null == n)
      return n;
    if (!r(n))
      return e(n, o);
    for (var a = n.length, i = t ? a : -1, l = Object(n); (t ? i-- : ++i < a) && !1 !== o(l[i], i, l););
    return n;
  };
};