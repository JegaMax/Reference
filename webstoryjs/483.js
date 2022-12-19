'use strict';
var r = n('./484'), o = n('./485'), a = n('./9');
function i(e, t, n, i, l, s, c) {
  var u = n.getStartOffset(), f = n.getEndOffset(), d = e.__get(l).getMutability(), p = c ? u : f;
  if ('MUTABLE' === d)
    return n;
  var h = o(t, l).filter(function (e) {
    return p <= e.end && p >= e.start;
  });
  1 != h.length && a(!1);
  var g = h[0];
  if ('IMMUTABLE' === d)
    return n.merge({
      anchorOffset: g.start,
      focusOffset: g.end,
      isBackward: !1
    });
  s || (c ? f = g.end : u = g.start);
  var m = r.getRemovalRange(u, f, t.getText().slice(g.start, g.end), g.start, i);
  return n.merge({
    anchorOffset: m.start,
    focusOffset: m.end,
    isBackward: !1
  });
}
e.exports = function (e, t, n, r, o) {
  var a = r.getStartOffset(), l = r.getEndOffset(), s = t.getEntityAt(a), c = n.getEntityAt(l - 1);
  if (!s && !c)
    return r;
  var u = r;
  if (s && s === c)
    u = i(e, t, u, o, s, !0, !0);
  else if (s && c) {
    var f = i(e, t, u, o, s, !1, !0), d = i(e, n, u, o, c, !1, !1);
    u = u.merge({
      anchorOffset: f.getAnchorOffset(),
      focusOffset: d.getFocusOffset(),
      isBackward: !1
    });
  } else if (s) {
    var p = i(e, t, u, o, s, !1, !0);
    u = u.merge({
      anchorOffset: p.getStartOffset(),
      isBackward: !1
    });
  } else if (c) {
    var h = i(e, n, u, o, c, !1, !1);
    u = u.merge({
      focusOffset: h.getEndOffset(),
      isBackward: !1
    });
  }
  return u;
};