'use strict';
var r = n('./244').notEmptyKey;
function o(e, t) {
  return r(t) && 'MUTABLE' === e.__get(t).getMutability() ? t : null;
}
e.exports = function (e, t) {
  var n;
  if (t.isCollapsed()) {
    var r = t.getAnchorKey(), a = t.getAnchorOffset();
    return a > 0 ? (n = e.getBlockForKey(r).getEntityAt(a - 1)) !== e.getBlockForKey(r).getEntityAt(a) ? null : o(e.getEntityMap(), n) : null;
  }
  var i = t.getStartKey(), l = t.getStartOffset(), s = e.getBlockForKey(i);
  return n = l === s.getLength() ? null : s.getEntityAt(l), o(e.getEntityMap(), n);
};