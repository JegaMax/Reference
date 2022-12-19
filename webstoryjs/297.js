var r = n('./84'), o = n('./41'), a = n('./179'), i = function (e) {
    return function (t, n, i) {
      var l, s = r(t), c = o(s.length), u = a(i, c);
      if (e && n != n) {
        for (; c > u;)
          if ((l = s[u++]) != l)
            return !0;
      } else
        for (; c > u; u++)
          if ((e || u in s) && s[u] === n)
            return e || u || 0;
      return !e && -1;
    };
  };
e.exports = {
  includes: i(!0),
  indexOf: i(!1)
};