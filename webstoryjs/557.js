'use strict';
e.exports = function (e, t, n, r) {
  var o = t.getStartKey(), a = t.getEndKey(), i = e.getBlockMap(), l = i.toSeq().skipUntil(function (e, t) {
      return t === o;
    }).takeUntil(function (e, t) {
      return t === a;
    }).concat([[
        a,
        i.get(a)
      ]]).map(function (e) {
      var t = e.getDepth() + n;
      return t = Math.max(0, Math.min(t, r)), e.set('depth', t);
    });
  return i = i.merge(l), e.merge({
    blockMap: i,
    selectionBefore: t,
    selectionAfter: t
  });
};