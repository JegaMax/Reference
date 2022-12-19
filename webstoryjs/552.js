'use strict';
var r = n('./75'), o = n('./29'), a = n('./252'), i = n('./21'), l = n('./553'), s = n('./11'), c = n('./262'), u = n('./157'), f = n('./254'), d = n('./114'), p = n('./558');
function h(e, t, n) {
  var r = i.replaceWithFragment(e.getCurrentContent(), e.getSelection(), t);
  return s.push(e, r.set('entityMap', n), 'insert-fragment');
}
e.exports = function (e, t) {
  t.preventDefault();
  var n = new a(t.clipboardData);
  if (!n.isRichText()) {
    var g = n.getFiles(), m = n.getText();
    if (g.length > 0) {
      if (e.props.handlePastedFiles && d(e.props.handlePastedFiles(g)))
        return;
      return void f(g, function (t) {
        if (t = t || m) {
          var n = e._latestEditorState, a = p(t), f = o.create({
              style: n.getCurrentInlineStyle(),
              entity: u(n.getCurrentContent(), n.getSelection())
            }), d = c.getCurrentBlockType(n), h = l.processText(a, f, d), g = r.createFromArray(h), b = i.replaceWithFragment(n.getCurrentContent(), n.getSelection(), g);
          e.update(s.push(n, b, 'insert-fragment'));
        }
      });
    }
  }
  var b = [], v = n.getText(), y = n.getHTML(), C = e._latestEditorState;
  if (e.props.formatPastedText) {
    var w = e.props.formatPastedText(v, y);
    v = w.text, y = w.html;
  }
  if (!e.props.handlePastedText || !d(e.props.handlePastedText(v, y, C))) {
    if (v && (b = p(v)), !e.props.stripPastedStyles) {
      var x, E = e.getClipboard();
      if (!e.props.formatPastedText && n.isRichText() && E) {
        if (-1 !== (null === (x = y) || void 0 === x ? void 0 : x.indexOf(e.getEditorKey())) || 1 === b.length && 1 === E.size && E.first().getText() === v)
          return void e.update(h(e._latestEditorState, E));
      } else if (E && n.types.includes('com.apple.webarchive') && !n.types.includes('text/html') && function (e, t) {
          return e.length === t.size && t.valueSeq().every(function (t, n) {
            return t.getText() === e[n];
          });
        }(b, E))
        return void e.update(h(e._latestEditorState, E));
      if (y) {
        var _ = l.processHTML(y, e.props.blockRenderMap);
        if (_) {
          var O = _.contentBlocks, S = _.entityMap;
          if (O) {
            var k = r.createFromArray(O);
            return void e.update(h(e._latestEditorState, k, S));
          }
        }
      }
      e.setClipboard(null);
    }
    if (b.length) {
      var A = o.create({
          style: C.getCurrentInlineStyle(),
          entity: u(C.getCurrentContent(), C.getSelection())
        }), j = c.getCurrentBlockType(C), M = l.processText(b, A, j), I = r.createFromArray(M);
      e.update(h(e._latestEditorState, I));
    }
  }
};