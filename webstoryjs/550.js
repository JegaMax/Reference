'use strict';
var r = n('./21'), o = n('./11'), a = n('./105');
e.exports = function (e) {
  var t = e.getSelection();
  if (!t.isCollapsed())
    return e;
  var n = t.getAnchorOffset();
  if (0 === n)
    return e;
  var i, l, s = t.getAnchorKey(), c = e.getCurrentContent(), u = c.getBlockForKey(s).getLength();
  if (u <= 1)
    return e;
  n === u ? (i = t.set('anchorOffset', n - 1), l = t) : l = (i = t.set('focusOffset', n + 1)).set('anchorOffset', n + 1);
  var f = a(c, i), d = r.removeRange(c, i, 'backward'), p = d.getSelectionAfter(), h = p.getAnchorOffset() - 1, g = p.merge({
      anchorOffset: h,
      focusOffset: h
    }), m = r.replaceWithFragment(d, g, f), b = o.push(e, m, 'insert-fragment');
  return o.acceptSelection(b, l);
};