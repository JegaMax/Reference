e.exports = function (e) {
  return function (t, n, r) {
    for (var o = -1, a = Object(t), i = r(t), l = i.length; l--;) {
      var s = i[e ? l : ++o];
      if (!1 === n(a[s], s, a))
        break;
    }
    return t;
  };
};