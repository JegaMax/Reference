'use strict';
var r = n('./30'), o = n('./231'), a = n('./8'), i = n('./9'), l = a.OrderedMap, s = a.List, c = function (e, t, n) {
    if (e) {
      var r = t.get(e);
      r && t.set(e, n(r));
    }
  }, u = function (e, t, n, r, o) {
    if (!o)
      return e;
    var a = 'after' === r, i = t.getKey(), l = n.getKey(), u = t.getParentKey(), f = t.getNextSiblingKey(), d = t.getPrevSiblingKey(), p = n.getParentKey(), h = a ? n.getNextSiblingKey() : l, g = a ? l : n.getPrevSiblingKey();
    return e.withMutations(function (e) {
      c(u, e, function (e) {
        var t = e.getChildKeys();
        return e.merge({ children: t.delete(t.indexOf(i)) });
      }), c(d, e, function (e) {
        return e.merge({ nextSibling: f });
      }), c(f, e, function (e) {
        return e.merge({ prevSibling: d });
      }), c(h, e, function (e) {
        return e.merge({ prevSibling: i });
      }), c(g, e, function (e) {
        return e.merge({ nextSibling: i });
      }), c(p, e, function (e) {
        var t = e.getChildKeys(), n = t.indexOf(l), r = a ? n + 1 : 0 !== n ? n - 1 : 0, o = t.toArray();
        return o.splice(r, 0, i), e.merge({ children: s(o) });
      }), c(i, e, function (e) {
        return e.merge({
          nextSibling: h,
          prevSibling: g,
          parent: p
        });
      });
    });
  };
e.exports = function (e, t, n, a) {
  'replace' === a && i(!1);
  var s = n.getKey(), c = t.getKey();
  c === s && i(!1);
  var f = e.getBlockMap(), d = t instanceof r, p = [t], h = f.delete(c);
  d && (p = [], h = f.withMutations(function (e) {
    var n = t.getNextSiblingKey(), r = o(t, e);
    e.toSeq().skipUntil(function (e) {
      return e.getKey() === c;
    }).takeWhile(function (e) {
      var t = e.getKey(), o = t === c, a = n && t !== n, i = !n && e.getParentKey() && (!r || t !== r);
      return !!(o || a || i);
    }).forEach(function (t) {
      p.push(t), e.delete(t.getKey());
    });
  }));
  var g = h.toSeq().takeUntil(function (e) {
      return e === n;
    }), m = h.toSeq().skipUntil(function (e) {
      return e === n;
    }).skip(1), b = p.map(function (e) {
      return [
        e.getKey(),
        e
      ];
    }), v = l();
  if ('before' === a) {
    var y = e.getBlockBefore(s);
    y && y.getKey() === t.getKey() && i(!1), v = g.concat([].concat(b, [[
        s,
        n
      ]]), m).toOrderedMap();
  } else if ('after' === a) {
    var C = e.getBlockAfter(s);
    C && C.getKey() === c && i(!1), v = g.concat([[
        s,
        n
      ]].concat(b), m).toOrderedMap();
  }
  return e.merge({
    blockMap: u(v, t, n, a, d),
    selectionBefore: e.getSelectionAfter(),
    selectionAfter: e.getSelectionAfter().merge({
      anchorKey: c,
      focusKey: c
    })
  });
};