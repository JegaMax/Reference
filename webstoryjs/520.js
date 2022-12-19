'use strict';
e.exports = function (e) {
  var t = e || '', n = arguments.length;
  if (n > 1)
    for (var r = 1; r < n; r++) {
      var o = arguments[r];
      o && (t = (t ? t + ' ' : '') + o);
    }
  return t;
};