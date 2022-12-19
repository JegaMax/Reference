'use strict';
function r(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
    'function' == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), r.forEach(function (t) {
      o(e, t, n[t]);
    });
  }
  return e;
}
function o(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var a = n('./75'), i = n('./29'), l = n('./53'), s = n('./30'), c = n('./21'), u = n('./11'), f = n('./39'), d = n('./44'), p = n('./8'), h = n('./494'), g = d('draft_tree_data_support'), m = g ? s : l, b = p.List, v = p.Repeat, y = {
    insertAtomicBlock: function (e, t, n) {
      var o = e.getCurrentContent(), l = e.getSelection(), s = c.removeRange(o, l, 'backward'), d = s.getSelectionAfter(), p = c.splitBlock(s, d), h = p.getSelectionAfter(), y = c.setBlockType(p, h, 'atomic'), C = i.create({ entity: t }), w = {
          key: f(),
          type: 'atomic',
          text: n,
          characterList: b(v(C, n.length))
        }, x = {
          key: f(),
          type: 'unstyled'
        };
      g && (w = r({}, w, { nextSibling: x.key }), x = r({}, x, { prevSibling: w.key }));
      var E = [
          new m(w),
          new m(x)
        ], _ = a.createFromArray(E), O = c.replaceWithFragment(y, h, _), S = O.merge({
          selectionBefore: l,
          selectionAfter: O.getSelectionAfter().set('hasFocus', !0)
        });
      return u.push(e, S, 'insert-fragment');
    },
    moveAtomicBlock: function (e, t, n, r) {
      var o, a = e.getCurrentContent(), i = e.getSelection();
      if ('before' === r || 'after' === r) {
        var l = a.getBlockForKey('before' === r ? n.getStartKey() : n.getEndKey());
        o = h(a, t, l, r);
      } else {
        var s = c.removeRange(a, n, 'backward'), f = s.getSelectionAfter(), d = s.getBlockForKey(f.getFocusKey());
        if (0 === f.getStartOffset())
          o = h(s, t, d, 'before');
        else if (f.getEndOffset() === d.getLength())
          o = h(s, t, d, 'after');
        else {
          var p = c.splitBlock(s, f), g = p.getSelectionAfter(), m = p.getBlockForKey(g.getFocusKey());
          o = h(p, t, m, 'before');
        }
      }
      var b = o.merge({
        selectionBefore: i,
        selectionAfter: o.getSelectionAfter().set('hasFocus', !0)
      });
      return u.push(e, b, 'move-block');
    }
  };
e.exports = y;