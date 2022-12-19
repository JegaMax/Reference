'use strict';
var r = n('./21'), o = n('./42'), a = n('./11'), i = n('./23'), l = n('./244').notEmptyKey, s = n('./109'), c = n('./256'), u = n('./22'), f = i.isEngine('Gecko');
e.exports = function (e, t) {
  void 0 !== e._pendingStateFromBeforeInput && (e.update(e._pendingStateFromBeforeInput), e._pendingStateFromBeforeInput = void 0);
  var n = e.editor.ownerDocument.defaultView.getSelection(), i = n.anchorNode, d = n.isCollapsed, p = (null == i ? void 0 : i.nodeType) !== Node.TEXT_NODE && (null == i ? void 0 : i.nodeType) !== Node.ELEMENT_NODE;
  if (null != i && !p) {
    if (i.nodeType === Node.TEXT_NODE && (null !== i.previousSibling || null !== i.nextSibling)) {
      var h = i.parentNode;
      if (null == h)
        return;
      i.nodeValue = h.textContent;
      for (var g = h.firstChild; null != g; g = g.nextSibling)
        g !== i && h.removeChild(g);
    }
    var m = i.textContent, b = e._latestEditorState, v = u(s(i)), y = o.decode(v), C = y.blockKey, w = y.decoratorKey, x = y.leafKey, E = b.getBlockTree(C).getIn([
        w,
        'leaves',
        x
      ]), _ = E.start, O = E.end, S = b.getCurrentContent(), k = S.getBlockForKey(C), A = k.getText().slice(_, O);
    if (m.endsWith('\n\n') && (m = m.slice(0, -1)), m !== A) {
      var j, M, I, T, P = b.getSelection(), D = P.merge({
          anchorOffset: _,
          focusOffset: O,
          isBackward: !1
        }), R = k.getEntityAt(_), N = l(R) ? S.getEntity(R) : null, z = 'MUTABLE' === (null != N ? N.getMutability() : null), L = z ? 'spellcheck-change' : 'apply-entity', B = r.replaceText(S, D, m, k.getInlineStyleAt(_), z ? k.getEntityAt(_) : null);
      if (f)
        j = n.anchorOffset, M = n.focusOffset, T = (I = _ + Math.min(j, M)) + Math.abs(j - M), j = I, M = T;
      else {
        var F = m.length - A.length;
        I = P.getStartOffset(), T = P.getEndOffset(), j = d ? T + F : I, M = T + F;
      }
      var H = B.merge({
        selectionBefore: S.getSelectionAfter(),
        selectionAfter: P.merge({
          anchorOffset: j,
          focusOffset: M
        })
      });
      e.update(a.push(b, H, L));
    } else {
      var U = t.nativeEvent.inputType;
      if (U) {
        var W = function (e, t) {
          switch (e) {
          case 'deleteContentBackward':
            return c(t);
          }
          return t;
        }(U, b);
        if (W !== b)
          return e.restoreEditorDOM(), void e.update(W);
      }
    }
  }
};