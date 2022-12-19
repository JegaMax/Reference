'use strict';
var r = n('./42'), o = n('./22');
e.exports = function (e, t, n, a, i) {
  var l = o(e.getSelection());
  if (!t || !a)
    return l;
  var s = r.decode(t), c = s.blockKey, u = e.getBlockTree(c), f = u && u.getIn([
      s.decoratorKey,
      'leaves',
      s.leafKey
    ]), d = r.decode(a), p = d.blockKey, h = e.getBlockTree(p), g = h && h.getIn([
      d.decoratorKey,
      'leaves',
      d.leafKey
    ]);
  if (!f || !g)
    return l;
  var m = f.get('start'), b = g.get('start'), v = f ? m + n : null, y = g ? b + i : null;
  if (l.getAnchorKey() === c && l.getAnchorOffset() === v && l.getFocusKey() === p && l.getFocusOffset() === y)
    return l;
  var C = !1;
  if (c === p) {
    var w = f.get('end'), x = g.get('end');
    C = b === m && x === w ? i < n : b < m;
  } else {
    C = e.getCurrentContent().getBlockMap().keySeq().skipUntil(function (e) {
      return e === c || e === p;
    }).first() === p;
  }
  return l.merge({
    anchorKey: c,
    anchorOffset: v,
    focusKey: p,
    focusOffset: y,
    isBackward: C
  });
};