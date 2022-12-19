'use strict';
var r = n('./8'), o = n('./229'), a = n('./9'), i = r.Repeat;
e.exports = function (e, t, n, r) {
  t.isCollapsed() || a(!1);
  var l = null;
  if (null != n && (l = n.length), null == l || 0 === l)
    return e;
  var s = e.getBlockMap(), c = t.getStartKey(), u = t.getStartOffset(), f = s.get(c), d = f.getText(), p = f.merge({
      text: d.slice(0, u) + n + d.slice(u, f.getLength()),
      characterList: o(f.getCharacterList(), i(r, l).toList(), u)
    }), h = u + l;
  return e.merge({
    blockMap: s.set(c, p),
    selectionAfter: t.merge({
      anchorOffset: h,
      focusOffset: h
    })
  });
};