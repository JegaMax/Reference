var r = n('./347'), o = n('./389'), a = n('./208');
e.exports = function (e) {
  var t = o(e);
  return 1 == t.length && t[0][2] ? a(t[0][0], t[0][1]) : function (n) {
    return n === e || r(n, e, t);
  };
};