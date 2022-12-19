'use strict';
var r = n('./30'), o = n('./39'), a = n('./8'), i = n('./9'), l = n('./230'), s = a.List, c = a.Map, u = function (e, t, n) {
    if (e) {
      var r = t.get(e);
      r && t.set(e, n(r));
    }
  };
e.exports = function (e, t) {
  t.isCollapsed() || i(!1);
  var n = t.getAnchorKey(), a = e.getBlockMap(), f = a.get(n), d = f.getText();
  if (!d) {
    var p = f.getType();
    if ('unordered-list-item' === p || 'ordered-list-item' === p)
      return l(e, t, function (e) {
        return e.merge({
          type: 'unstyled',
          depth: 0
        });
      });
  }
  var h = t.getAnchorOffset(), g = f.getCharacterList(), m = o(), b = f instanceof r, v = f.merge({
      text: d.slice(0, h),
      characterList: g.slice(0, h)
    }), y = v.merge({
      key: m,
      text: d.slice(h),
      characterList: g.slice(h),
      data: c()
    }), C = a.toSeq().takeUntil(function (e) {
      return e === f;
    }), w = a.toSeq().skipUntil(function (e) {
      return e === f;
    }).rest(), x = C.concat([
      [
        n,
        v
      ],
      [
        m,
        y
      ]
    ], w).toOrderedMap();
  return b && (f.getChildKeys().isEmpty() || i(!1), x = function (e, t, n) {
    return e.withMutations(function (e) {
      var r = t.getKey(), o = n.getKey();
      u(t.getParentKey(), e, function (e) {
        var t = e.getChildKeys(), n = t.indexOf(r) + 1, a = t.toArray();
        return a.splice(n, 0, o), e.merge({ children: s(a) });
      }), u(t.getNextSiblingKey(), e, function (e) {
        return e.merge({ prevSibling: o });
      }), u(r, e, function (e) {
        return e.merge({ nextSibling: o });
      }), u(o, e, function (e) {
        return e.merge({ prevSibling: r });
      });
    });
  }(x, v, y)), e.merge({
    blockMap: x,
    selectionBefore: t,
    selectionAfter: t.merge({
      anchorKey: m,
      anchorOffset: 0,
      focusKey: m,
      focusOffset: 0,
      isBackward: !1
    })
  });
};