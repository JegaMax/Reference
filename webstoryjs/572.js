'use strict';
var r = n('./257');
e.exports = function (e) {
  var t = r(e), n = 0, o = 0, a = 0, i = 0;
  if (t.length) {
    if (t.length > 1 && 0 === t[0].width) {
      var l = t[1];
      n = l.top, o = l.right, a = l.bottom, i = l.left;
    } else {
      var s = t[0];
      n = s.top, o = s.right, a = s.bottom, i = s.left;
    }
    for (var c = 1; c < t.length; c++) {
      var u = t[c];
      0 !== u.height && 0 !== u.width && (n = Math.min(n, u.top), o = Math.max(o, u.right), a = Math.max(a, u.bottom), i = Math.min(i, u.left));
    }
  }
  return {
    top: n,
    right: o,
    bottom: a,
    left: i,
    width: o - i,
    height: a - n
  };
};