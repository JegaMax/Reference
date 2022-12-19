var r = n('./24'), o = n('./84'), a = n('./297').indexOf, i = n('./128');
e.exports = function (e, t) {
  var n, l = o(e), s = 0, c = [];
  for (n in l)
    !r(i, n) && r(l, n) && c.push(n);
  for (; t.length > s;)
    r(l, n = t[s++]) && (~a(c, n) || c.push(n));
  return c;
};