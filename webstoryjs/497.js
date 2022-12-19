'use strict';
var r = n('./498'), o = n('./21'), a = n('./42'), i = n('./11'), l = n('./111'), s = n('./23'), c = n('./238'), u = n('./240'), f = n('./241'), d = n('./157'), p = n('./22'), h = s.isBrowser('IE'), g = !1, m = !1, b = null;
var v = {
  onCompositionStart: function (e) {
    m = !0, function (e) {
      b || (b = new r(u(e))).start();
    }(e);
  },
  onCompositionEnd: function (e) {
    g = !1, m = !1, setTimeout(function () {
      g || v.resolveComposition(e);
    }, 20);
  },
  onSelect: c,
  onKeyDown: function (e, t) {
    if (!m)
      return v.resolveComposition(e), void e._onKeyDown(t);
    t.which !== l.RIGHT && t.which !== l.LEFT || t.preventDefault();
  },
  onKeyPress: function (e, t) {
    t.which === l.RETURN && t.preventDefault();
  },
  resolveComposition: function (e) {
    if (!m) {
      var t = p(b).stopAndFlushMutations();
      b = null, g = !0;
      var n = i.set(e._latestEditorState, { inCompositionMode: !1 });
      if (e.exitCurrentMode(), t.size) {
        var r = n.getCurrentContent();
        t.forEach(function (e, t) {
          var l = a.decode(t), s = l.blockKey, c = l.decoratorKey, u = l.leafKey, f = n.getBlockTree(s).getIn([
              c,
              'leaves',
              u
            ]), p = f.start, h = f.end, g = n.getSelection().merge({
              anchorKey: s,
              focusKey: s,
              anchorOffset: p,
              focusOffset: h,
              isBackward: !1
            }), m = d(r, g), b = r.getBlockForKey(s).getInlineStyleAt(p);
          r = o.replaceText(r, g, e, b, m), n = i.set(n, { currentContent: r });
        });
        var l = f(n, u(e)).selectionState;
        e.restoreEditorDOM();
        var s = h ? i.forceSelection(n, l) : i.acceptSelection(n, l);
        e.update(i.push(s, r, 'insert-characters'));
      } else
        e.update(n);
    }
  }
};
e.exports = v;