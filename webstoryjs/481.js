'use strict';
var r = n('./482'), o = n('./8');
e.exports = function (e, t, n) {
  var a = e.getBlockMap(), i = t.getStartKey(), l = t.getStartOffset(), s = t.getEndKey(), c = t.getEndOffset(), u = a.skipUntil(function (e, t) {
      return t === i;
    }).takeUntil(function (e, t) {
      return t === s;
    }).toOrderedMap().merge(o.OrderedMap([[
        s,
        a.get(s)
      ]])).map(function (e, t) {
      var o = t === i ? l : 0, a = t === s ? c : e.getLength();
      return r(e, o, a, n);
    });
  return e.merge({
    blockMap: a.merge(u),
    selectionBefore: t,
    selectionAfter: t
  });
};