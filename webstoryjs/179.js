var r = n('./47'), o = Math.max, a = Math.min;
e.exports = function (e, t) {
  var n = r(e);
  return n < 0 ? o(n + t, 0) : a(n, t);
};