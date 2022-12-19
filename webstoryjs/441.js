var r = n('./442'), o = n('./449');
e.exports = function (e) {
  return r(function (t, n) {
    var r = -1, a = n.length, i = a > 1 ? n[a - 1] : void 0, l = a > 2 ? n[2] : void 0;
    for (i = e.length > 3 && 'function' == typeof i ? (a--, i) : void 0, l && o(n[0], n[1], l) && (i = a < 3 ? void 0 : i, a = 1), t = Object(t); ++r < a;) {
      var s = n[r];
      s && e(t, s, r, i);
    }
    return t;
  });
};