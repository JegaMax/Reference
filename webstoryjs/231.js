'use strict';
var r = n('./30');
e.exports = function (e, t) {
  if (!(e instanceof r))
    return null;
  var n = e.getNextSiblingKey();
  if (n)
    return n;
  var o = e.getParentKey();
  if (!o)
    return null;
  for (var a = t.get(o); a && !a.getNextSiblingKey();) {
    var i = a.getParentKey();
    a = i ? t.get(i) : null;
  }
  return a ? a.getNextSiblingKey() : null;
};