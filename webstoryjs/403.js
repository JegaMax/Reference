var r = n('./211'), o = n('./61');
e.exports = function (e, t) {
  var n = -1, a = o(e) ? Array(e.length) : [];
  return r(e, function (e, r, o) {
    a[++n] = t(e, r, o);
  }), a;
};