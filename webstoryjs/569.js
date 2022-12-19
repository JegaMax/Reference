'use strict';
var r = n('./56').substr;
e.exports = function (e, t) {
  var n = Array(e.length).fill(null);
  return t && t.forEach(function (t) {
    for (var o = r(e, 0, t.offset).length, a = o + r(e, t.offset, t.length).length, i = o; i < a; i++)
      n[i] = t.key;
  }), n;
};