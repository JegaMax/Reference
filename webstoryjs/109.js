'use strict';
var r = n('./110'), o = n('./236');
e.exports = function (e) {
  for (var t = e; t && t !== r(e).documentElement;) {
    var n = o(t);
    if (null != n)
      return n;
    t = t.parentNode;
  }
  return null;
};