'use strict';
var r = n('./30'), o = n('./231'), a = n('./8'), i = (a.List, a.Map), l = function (e, t, n) {
    if (e) {
      var r = t.get(e);
      r && t.set(e, n(r));
    }
  }, s = function (e, t) {
    var n = [];
    if (!e)
      return n;
    for (var r = t.get(e); r && r.getParentKey();) {
      var o = r.getParentKey();
      o && n.push(o), r = o ? t.get(o) : null;
    }
    return n;
  }, c = function (e, t, n) {
    if (!e)
      return null;
    for (var r = n.get(e.getKey()).getNextSiblingKey(); r && !t.get(r);)
      r = n.get(r).getNextSiblingKey() || null;
    return r;
  }, u = function (e, t, n) {
    if (!e)
      return null;
    for (var r = n.get(e.getKey()).getPrevSiblingKey(); r && !t.get(r);)
      r = n.get(r).getPrevSiblingKey() || null;
    return r;
  }, f = function (e, t, n, r) {
    return e.withMutations(function (a) {
      if (l(t.getKey(), a, function (e) {
          return e.merge({
            nextSibling: c(e, a, r),
            prevSibling: u(e, a, r)
          });
        }), l(n.getKey(), a, function (e) {
          return e.merge({
            nextSibling: c(e, a, r),
            prevSibling: u(e, a, r)
          });
        }), s(t.getKey(), r).forEach(function (e) {
          return l(e, a, function (e) {
            return e.merge({
              children: e.getChildKeys().filter(function (e) {
                return a.get(e);
              }),
              nextSibling: c(e, a, r),
              prevSibling: u(e, a, r)
            });
          });
        }), l(t.getNextSiblingKey(), a, function (e) {
          return e.merge({ prevSibling: t.getPrevSiblingKey() });
        }), l(t.getPrevSiblingKey(), a, function (e) {
          return e.merge({ nextSibling: c(e, a, r) });
        }), l(n.getNextSiblingKey(), a, function (e) {
          return e.merge({ prevSibling: u(e, a, r) });
        }), l(n.getPrevSiblingKey(), a, function (e) {
          return e.merge({ nextSibling: n.getNextSiblingKey() });
        }), s(n.getKey(), r).forEach(function (e) {
          l(e, a, function (e) {
            return e.merge({
              children: e.getChildKeys().filter(function (e) {
                return a.get(e);
              }),
              nextSibling: c(e, a, r),
              prevSibling: u(e, a, r)
            });
          });
        }), function (e, t) {
          var n = [];
          if (!e)
            return n;
          for (var r = o(e, t); r && t.get(r);) {
            var a = t.get(r);
            n.push(r), r = a.getParentKey() ? o(a, t) : null;
          }
          return n;
        }(n, r).forEach(function (e) {
          return l(e, a, function (e) {
            return e.merge({
              nextSibling: c(e, a, r),
              prevSibling: u(e, a, r)
            });
          });
        }), null == e.get(t.getKey()) && null != e.get(n.getKey()) && n.getParentKey() === t.getKey() && null == n.getPrevSiblingKey()) {
        var i = t.getPrevSiblingKey();
        l(n.getKey(), a, function (e) {
          return e.merge({ prevSibling: i });
        }), l(i, a, function (e) {
          return e.merge({ nextSibling: n.getKey() });
        });
        var f = i ? e.get(i) : null, d = f ? f.getParentKey() : null;
        if (t.getChildKeys().forEach(function (e) {
            l(e, a, function (e) {
              return e.merge({ parent: d });
            });
          }), null != d) {
          var p = e.get(d);
          l(d, a, function (e) {
            return e.merge({ children: p.getChildKeys().concat(t.getChildKeys()) });
          });
        }
        l(t.getChildKeys().find(function (t) {
          return null === e.get(t).getNextSiblingKey();
        }), a, function (e) {
          return e.merge({ nextSibling: t.getNextSiblingKey() });
        });
      }
    });
  }, d = function (e, t, n) {
    if (0 === t)
      for (; t < n;)
        e = e.shift(), t++;
    else if (n === e.count())
      for (; n > t;)
        e = e.pop(), n--;
    else {
      var r = e.slice(0, t), o = e.slice(n);
      e = r.concat(o).toList();
    }
    return e;
  };
e.exports = function (e, t) {
  if (t.isCollapsed())
    return e;
  var n, a = e.getBlockMap(), l = t.getStartKey(), c = t.getStartOffset(), u = t.getEndKey(), p = t.getEndOffset(), h = a.get(l), g = a.get(u), m = h instanceof r, b = [];
  if (m) {
    var v = g.getChildKeys(), y = s(u, a);
    g.getNextSiblingKey() && (b = b.concat(y)), v.isEmpty() || (b = b.concat(y.concat([u]))), b = b.concat(s(o(g, a), a));
  }
  n = h === g ? d(h.getCharacterList(), c, p) : h.getCharacterList().slice(0, c).concat(g.getCharacterList().slice(p));
  var C = h.merge({
      text: h.getText().slice(0, c) + g.getText().slice(p),
      characterList: n
    }), w = m && 0 === c && 0 === p && g.getParentKey() === l && null == g.getPrevSiblingKey() ? i([[
        l,
        null
      ]]) : a.toSeq().skipUntil(function (e, t) {
      return t === l;
    }).takeUntil(function (e, t) {
      return t === u;
    }).filter(function (e, t) {
      return -1 === b.indexOf(t);
    }).concat(i([[
        u,
        null
      ]])).map(function (e, t) {
      return t === l ? C : null;
    }), x = a.merge(w).filter(function (e) {
      return !!e;
    });
  return m && h !== g && (x = f(x, h, g, a)), e.merge({
    blockMap: x,
    selectionBefore: t,
    selectionAfter: t.merge({
      anchorKey: l,
      anchorOffset: c,
      focusKey: l,
      focusOffset: c,
      isBackward: !1
    })
  });
};