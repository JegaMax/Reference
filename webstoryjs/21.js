'use strict';
var r = n('./29'), o = n('./480'), a = n('./481'), i = n('./483'), l = n('./105'), s = n('./8'), c = n('./486'), u = n('./487'), f = n('./9'), d = n('./230'), p = n('./228'), h = n('./488'), g = n('./489'), m = s.OrderedSet, b = {
    replaceText: function (e, t, n, o, a) {
      var i = p(e, t), l = h(i, t), s = r.create({
          style: o || m(),
          entity: a || null
        });
      return u(l, l.getSelectionAfter(), n, s);
    },
    insertText: function (e, t, n, r, o) {
      return t.isCollapsed() || f(!1), b.replaceText(e, t, n, r, o);
    },
    moveText: function (e, t, n) {
      var r = l(e, t), o = b.removeRange(e, t, 'backward');
      return b.replaceWithFragment(o, n, r);
    },
    replaceWithFragment: function (e, t, n) {
      var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 'REPLACE_WITH_NEW_DATA', o = p(e, t), a = h(o, t);
      return c(a, a.getSelectionAfter(), n, r);
    },
    removeRange: function (e, t, n) {
      var r, o, a, l;
      t.getIsBackward() && (t = t.merge({
        anchorKey: t.getFocusKey(),
        anchorOffset: t.getFocusOffset(),
        focusKey: t.getAnchorKey(),
        focusOffset: t.getAnchorOffset(),
        isBackward: !1
      })), r = t.getAnchorKey(), o = t.getFocusKey(), a = e.getBlockForKey(r), l = e.getBlockForKey(o);
      var s = t.getStartOffset(), c = t.getEndOffset(), u = a.getEntityAt(s), f = l.getEntityAt(c - 1);
      if (r === o && u && u === f) {
        var d = i(e.getEntityMap(), a, l, t, n);
        return h(e, d);
      }
      var g = p(e, t);
      return h(g, t);
    },
    splitBlock: function (e, t) {
      var n = p(e, t), r = h(n, t);
      return g(r, r.getSelectionAfter());
    },
    applyInlineStyle: function (e, t, n) {
      return o.add(e, t, n);
    },
    removeInlineStyle: function (e, t, n) {
      return o.remove(e, t, n);
    },
    setBlockType: function (e, t, n) {
      return d(e, t, function (e) {
        return e.merge({
          type: n,
          depth: 0
        });
      });
    },
    setBlockData: function (e, t, n) {
      return d(e, t, function (e) {
        return e.merge({ data: n });
      });
    },
    mergeBlockData: function (e, t, n) {
      return d(e, t, function (e) {
        return e.merge({ data: e.getData().merge(n) });
      });
    },
    applyEntity: function (e, t, n) {
      var r = p(e, t);
      return a(r, t, n);
    }
  };
e.exports = b;