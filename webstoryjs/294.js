var r = n('./24'), o = n('./295'), a = n('./129'), i = n('./36');
e.exports = function (e, t) {
  for (var n = o(t), l = i.f, s = a.f, c = 0; c < n.length; c++) {
    var u = n[c];
    r(e, u) || l(e, u, s(t, u));
  }
};