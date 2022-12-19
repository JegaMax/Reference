'use strict';
var r = n('./21'), o = n('./11'), a = n('./23'), i = n('./157'), l = n('./114'), s = n('./526'), c = n('./22'), u = n('./527'), f = a.isBrowser('Firefox');
function d(e, t, n, a, i) {
  var l = r.replaceText(e.getCurrentContent(), e.getSelection(), t, n, a);
  return o.push(e, l, 'insert-characters', i);
}
e.exports = function (e, t) {
  void 0 !== e._pendingStateFromBeforeInput && (e.update(e._pendingStateFromBeforeInput), e._pendingStateFromBeforeInput = void 0);
  var n = e._latestEditorState, r = t.data;
  if (r)
    if (e.props.handleBeforeInput && l(e.props.handleBeforeInput(r, n, t.timeStamp)))
      t.preventDefault();
    else {
      var a = n.getSelection(), p = a.getStartOffset(), h = a.getAnchorKey();
      if (!a.isCollapsed())
        return t.preventDefault(), void e.update(d(n, r, n.getCurrentInlineStyle(), i(n.getCurrentContent(), n.getSelection()), !0));
      var g, m = d(n, r, n.getCurrentInlineStyle(), i(n.getCurrentContent(), n.getSelection()), !1), b = !1;
      if (b || (b = s(e._latestCommittedEditorState)), !b) {
        var v = n.getBlockTree(h), y = m.getBlockTree(h);
        b = v.size !== y.size || v.zip(y).some(function (e) {
          var t = e[0], n = e[1], o = t.get('start'), a = o + (o >= p ? r.length : 0), i = t.get('end'), l = i + (i >= p ? r.length : 0), s = n.get('start'), c = n.get('end'), u = n.get('decoratorKey');
          return t.get('decoratorKey') !== u || t.get('leaves').size !== n.get('leaves').size || a !== s || l !== c || null != u && c - s != i - o;
        });
      }
      if (b || (g = r, b = f && ('\'' == g || '/' == g)), b || (b = c(m.getDirectionMap()).get(h) !== c(n.getDirectionMap()).get(h)), b)
        return t.preventDefault(), m = o.set(m, { forceSelection: !0 }), void e.update(m);
      m = o.set(m, { nativelyRenderedContent: m.getCurrentContent() }), e._pendingStateFromBeforeInput = m, u(function () {
        void 0 !== e._pendingStateFromBeforeInput && (e.update(e._pendingStateFromBeforeInput), e._pendingStateFromBeforeInput = void 0);
      });
    }
};