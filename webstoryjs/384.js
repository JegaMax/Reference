e.exports = function (e, t) {
  for (var n = -1, r = null == e ? 0 : e.length, o = 0, a = []; ++n < r;) {
    var i = e[n];
    t(i, n, e) && (a[o++] = i);
  }
  return a;
};