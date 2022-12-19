'use strict';
var r = n('./572');
e.exports = function (e) {
  var t = e.getSelection();
  if (!t.rangeCount)
    return null;
  var n = t.getRangeAt(0), o = r(n), a = o.top, i = o.right, l = o.bottom, s = o.left;
  return 0 === a && 0 === i && 0 === l && 0 === s ? null : o;
};