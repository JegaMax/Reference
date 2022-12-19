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
function a(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
    'function' == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), r.forEach(function (t) {
      i(e, t, n[t]);
    });
  }
  return e;
}
function i(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var l = n('./251'), s = n('./42'), c = n('./0'), u = n('./54'), f = n('./520'), d = n('./22'), p = function (e, t, n, r) {
    return u({
      'public/DraftStyleDefault/unorderedListItem': 'unordered-list-item' === e,
      'public/DraftStyleDefault/orderedListItem': 'ordered-list-item' === e,
      'public/DraftStyleDefault/reset': n,
      'public/DraftStyleDefault/depth0': 0 === t,
      'public/DraftStyleDefault/depth1': 1 === t,
      'public/DraftStyleDefault/depth2': 2 === t,
      'public/DraftStyleDefault/depth3': 3 === t,
      'public/DraftStyleDefault/depth4': t >= 4,
      'public/DraftStyleDefault/listLTR': 'LTR' === r,
      'public/DraftStyleDefault/listRTL': 'RTL' === r
    });
  }, h = function (e) {
    var t, n;
    function DraftEditorContents() {
      return e.apply(this, arguments) || this;
    }
    n = e, (t = DraftEditorContents).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
    var r = DraftEditorContents.prototype;
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
      for (var e = this.props, t = e.blockRenderMap, n = e.blockRendererFn, r = e.blockStyleFn, i = e.customStyleMap, u = e.customStyleFn, h = e.editorState, g = e.editorKey, m = e.preventScroll, b = e.textDirectionality, v = h.getCurrentContent(), y = h.getSelection(), C = h.mustForceSelection(), w = h.getDecorator(), x = d(h.getDirectionMap()), E = v.getBlocksAsArray(), _ = [], O = null, S = null, k = 0; k < E.length; k++) {
        var A = E[k], j = A.getKey(), M = A.getType(), I = n(A), T = void 0, P = void 0, D = void 0;
        I && (T = I.component, P = I.props, D = I.editable);
        var R = b || x.get(j), N = s.encode(j, 0, 0), z = {
            contentState: v,
            block: A,
            blockProps: P,
            blockStyleFn: r,
            customStyleMap: i,
            customStyleFn: u,
            decorator: w,
            direction: R,
            forceSelection: C,
            offsetKey: N,
            preventScroll: m,
            selection: y,
            tree: h.getBlockTree(j)
          }, L = t.get(M) || t.get('unstyled'), B = L.wrapper, F = L.element || t.get('unstyled').element, H = A.getDepth(), U = '';
        if (r && (U = r(A)), 'li' === F)
          U = f(U, p(M, H, S !== B || null === O || H > O, R));
        var W = T || l, V = {
            className: U,
            'data-block': !0,
            'data-editor': g,
            'data-offset-key': N,
            key: j
          };
        void 0 !== D && (V = a({}, V, {
          contentEditable: D,
          suppressContentEditableWarning: !0
        }));
        var K = c.createElement(F, V, c.createElement(W, o({}, z, { key: j })));
        _.push({
          block: K,
          wrapperTemplate: B,
          key: j,
          offsetKey: N
        }), O = B ? A.getDepth() : null, S = B;
      }
      for (var q = [], G = 0; G < _.length;) {
        var Z = _[G];
        if (Z.wrapperTemplate) {
          var Y = [];
          do {
            Y.push(_[G].block), G++;
          } while (G < _.length && _[G].wrapperTemplate === Z.wrapperTemplate);
          var Q = c.cloneElement(Z.wrapperTemplate, {
            key: Z.key + '-wrap',
            'data-offset-key': Z.offsetKey
          }, Y);
          q.push(Q);
        } else
          q.push(Z.block), G++;
      }
      return c.createElement('div', { 'data-contents': 'true' }, q);
    }, DraftEditorContents;
  }(c.Component);
e.exports = h;