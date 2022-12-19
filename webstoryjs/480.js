'use strict';
var r = n('./29'), o = n('./8').Map, a = {
    add: function (e, t, n) {
      return i(e, t, n, !0);
    },
    remove: function (e, t, n) {
      return i(e, t, n, !1);
    }
  };
function i(e, t, n, a) {
  var i = e.getBlockMap(), l = t.getStartKey(), s = t.getStartOffset(), c = t.getEndKey(), u = t.getEndOffset(), f = i.skipUntil(function (e, t) {
      return t === l;
    }).takeUntil(function (e, t) {
      return t === c;
    }).concat(o([[
        c,
        i.get(c)
      ]])).map(function (e, t) {
      var o, i;
      l === c ? (o = s, i = u) : (o = t === l ? s : 0, i = t === c ? u : e.getLength());
      for (var f, d = e.getCharacterList(); o < i;)
        f = d.get(o), d = d.set(o, a ? r.applyStyle(f, n) : r.removeStyle(f, n)), o++;
      return e.set('characterList', d);
    });
  return e.merge({
    blockMap: i.merge(f),
    selectionBefore: t,
    selectionAfter: t
  });
}
e.exports = a;