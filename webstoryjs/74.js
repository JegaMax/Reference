var r = n('./213'), o = n('./149');
e.exports = function (e, t, n, a) {
  var i = !n;
  n || (n = {});
  for (var l = -1, s = t.length; ++l < s;) {
    var c = t[l], u = a ? a(n[c], e[c], c, n, e) : void 0;
    void 0 === u && (u = e[c]), i ? o(n, c, u) : r(n, c, u);
  }
  return n;
};