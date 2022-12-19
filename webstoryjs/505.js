'use strict';
var r = n('./34');
function o() {
  return (o = r || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }).apply(this, arguments);
}
var a = n('./506'), i = n('./42'), l = n('./0'), s = n('./22'), c = function (e) {
    var t, n;
    function DraftEditorContentsExperimental() {
      return e.apply(this, arguments) || this;
    }
    n = e, (t = DraftEditorContentsExperimental).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
    var r = DraftEditorContentsExperimental.prototype;
    return r.shouldComponentUpdate = function (e) {
      var t = this.props.editorState, n = e.editorState;
      if (t.getDirectionMap() !== n.getDirectionMap())
        return !0;
      if (t.getSelection().getHasFocus() !== n.getSelection().getHasFocus())
        return !0;
      var r = n.getNativelyRenderedContent(), o = t.isInCompositionMode(), a = n.isInCompositionMode();
      if (t === n || null !== r && n.getCurrentContent() === r || o && a)
        return !1;
      var i = t.getCurrentContent(), l = n.getCurrentContent(), s = t.getDecorator(), c = n.getDecorator();
      return o !== a || i !== l || s !== c || n.mustForceSelection();
    }, r.render = function () {
      for (var e = this.props, t = e.blockRenderMap, n = e.blockRendererFn, r = e.blockStyleFn, c = e.customStyleMap, u = e.customStyleFn, f = e.editorState, d = e.editorKey, p = e.textDirectionality, h = f.getCurrentContent(), g = f.getSelection(), m = f.mustForceSelection(), b = f.getDecorator(), v = s(f.getDirectionMap()), y = [], C = h.getBlocksAsArray()[0]; C;) {
        var w = C.getKey(), x = {
            blockRenderMap: t,
            blockRendererFn: n,
            blockStyleFn: r,
            contentState: h,
            customStyleFn: u,
            customStyleMap: c,
            decorator: b,
            editorKey: d,
            editorState: f,
            forceSelection: m,
            selection: g,
            block: C,
            direction: p || v.get(w),
            tree: f.getBlockTree(w)
          }, E = (t.get(C.getType()) || t.get('unstyled')).wrapper;
        y.push({
          block: l.createElement(a, o({ key: w }, x)),
          wrapperTemplate: E,
          key: w,
          offsetKey: i.encode(w, 0, 0)
        });
        var _ = C.getNextSiblingKey();
        C = _ ? h.getBlockForKey(_) : null;
      }
      for (var O = [], S = 0; S < y.length;) {
        var k = y[S];
        if (k.wrapperTemplate) {
          var A = [];
          do {
            A.push(y[S].block), S++;
          } while (S < y.length && y[S].wrapperTemplate === k.wrapperTemplate);
          var j = l.cloneElement(k.wrapperTemplate, {
            key: k.key + '-wrap',
            'data-offset-key': k.offsetKey
          }, A);
          O.push(j);
        } else
          O.push(k.block), S++;
      }
      return l.createElement('div', { 'data-contents': 'true' }, O);
    }, DraftEditorContentsExperimental;
  }(l.Component);
e.exports = c;