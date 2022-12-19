'use strict';
var r = n('./8').Map;
e.exports = function (e, t, n) {
  var o = t.getStartKey(), a = t.getEndKey(), i = e.getBlockMap(), l = i.toSeq().skipUntil(function (e, t) {
      return t === o;
    }).takeUntil(function (e, t) {
      return t === a;
    }).concat(r([[
        a,
        i.get(a)
      ]])).map(n);
  return e.merge({
    blockMap: i.merge(l),
    selectionBefore: t,
    selectionAfter: t
  });
};