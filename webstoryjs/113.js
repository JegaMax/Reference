'use strict';
var r = n('./517'), o = n('./518');
e.exports = function (e) {
  var t = r(e.ownerDocument || e.document);
  e.Window && e instanceof e.Window && (e = t);
  var n = o(e), a = e === t ? e.ownerDocument.documentElement : e, i = e.scrollWidth - a.clientWidth, l = e.scrollHeight - a.clientHeight;
  return n.x = Math.max(0, Math.min(n.x, i)), n.y = Math.max(0, Math.min(n.y, l)), n;
};