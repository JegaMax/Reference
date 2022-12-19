var r = n('./444'), o = Math.max;
e.exports = function (e, t, n) {
  return t = o(void 0 === t ? e.length - 1 : t, 0), function () {
    for (var a = arguments, i = -1, l = o(a.length - t, 0), s = Array(l); ++i < l;)
      s[i] = a[t + i];
    i = -1;
    for (var c = Array(t + 1); ++i < t;)
      c[i] = a[i];
    return c[t] = n(s), r(e, this, c);
  };
};