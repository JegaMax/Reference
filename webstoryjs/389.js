var r = n('./207'), o = n('./72');
e.exports = function (e) {
  for (var t = o(e), n = t.length; n--;) {
    var a = t[n], i = e[a];
    t[n] = [
      a,
      i,
      r(i)
    ];
  }
  return t;
};